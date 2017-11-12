<template>
  <div>
    <md-table-card class="card-table">
      <md-toolbar>
        <h1 class="md-title">Мои товары</h1>
        <div>
        </div>
        <md-button @click="showFilterForm" class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-button @click="showProductForm" class="md-icon-button">
          <md-icon>{{addProductIcon}}</md-icon>
        </md-button>
      </md-toolbar>
      <md-input-container
        v-show="displayFilterForm"
        class="table__filter-container">
        <md-input
          autofocus
          maxlength="20"
          placeholder="Найти товар"
          v-model="filterProduct" >
        </md-input>
      </md-input-container>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head
            v-for="(title, index) in tableTitles"
            :key="index">
            {{ title }}
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-show="displayProductForm">
          <md-table-cell>
            <md-input-container>
              <md-input
                maxlength="20"
                class="table__input"
                autofocus
                placeholder="Наименование"
                v-model="name">
              </md-input>
            </md-input-container>
          </md-table-cell>
          <md-table-cell>
          <md-input-container>
            <md-input
              type="number"
              class="table__input"
              placeholder="Количество"
              v-model.number="count">
            </md-input>
          </md-input-container>
          </md-table-cell>
          <md-table-cell>
            <md-input-container>
              <md-input
                class="table__input"
                type="number"
                placeholder="Цена"
                v-model.number="price">
              </md-input>
            </md-input-container>
          </md-table-cell>
          <md-table-cell>
            <md-button @click="toggleAddToEdit()" class="md-icon-button">
              <md-icon>check</md-icon>
            </md-button>
            <span class="table__input-description">{{productDescriptionOperation}}</span>
          </md-table-cell>
        </md-table-row>
        <md-table-row v-for="(entry, index)  in tableProductList" :key="index">
          <md-table-cell v-for="(name, key) in entry" :key="key">{{name}}</md-table-cell>
          <md-table-cell class="table__icon-container">
            <md-button @click="removeProduct(entry)" class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button @click="showEditableProductForm(entry)" class="md-icon-button">
              <md-icon >edit</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
        <md-table-row>
          <md-table-cell>Итог: {{totalProduct}}</md-table-cell>
          <md-table-cell> {{totalCount}}</md-table-cell>
          <md-table-cell> {{totalPrice}}</md-table-cell>
        </md-table-row>
    </md-table>
    </md-table-card>
  </div>
</template>

<script>
  export default {
    name: 'ProductTable',
    data() {
      return {
        // Наименования данных продукта
        name: null,
        count: null,
        price: null,
        filterProduct: null,
        // Свойство для отображения формы поиска
        displayFilterForm: false,
        // Свойство для хранения добавляемых продуктов
        productList: [],
        // Свойство для переключения режима редактирования данных продукта
        editableProduct: false,
        // Свойство для передачи индекса редактируемого продукта
        editableProductIndex: null,
        // Название колонок в таблице
        tableTitles: ['Название', 'Количество', 'Цена'],
        // Свойство для отображения формы редактирования/добавления продукта
        displayProductForm: false,
      };
    },
    methods: {
      // Функция для очистки данных формы
      clearProductForm() {
        this.name = null;
        this.count = null;
        this.price = null;
      },
      // Функция для показа/закрытия формы
      showProductForm() {
        this.clearProductForm();
        this.editableProduct = false;
        this.filterProduct = null;
        this.displayProductForm = !this.displayProductForm;
      },
      // Функция для определения режима редактирования продукта и добавление нового продукта
      toggleAddToEdit() {
        const { editableProduct, addProduct, editProduct } = this;
        if (editableProduct) {
          return editProduct();
        }
        return addProduct();
      },
      // Функция для добавления продукта
      addProduct() {
        this.productList.push({
          name: this.name,
          count: this.count,
          price: this.price,
        });
        this.filterProduct = null;
        this.clearProductForm();
      },
      // Функция для редактирование полей таблицы продукта
      editProduct() {
        const {
          productList,
          editableProductIndex,
          name,
          count,
          price } = this;
        // Вычисление редактируемого продукта по индексу и замена его свойств на редактируемые
        const newProduct = Object.assign(productList[editableProductIndex],
          { name, count, price });
        // Поиск и замена редактируемого продукта
        productList.splice(this.editableProductIndex, 1, newProduct);
        this.editableProduct = false;
        this.showProductForm();
      },
      // Функция для переключения в режим редактирования продукта
      showEditableProductForm(entry) {
        this.showProductForm();
        const displayProductForm = true;
        const editableProduct = true;
        // Данные из полей редактируемого продукта заполняются в форму
        const { name, count, price } = entry;
        Object.assign(this, { name, count, price, displayProductForm, editableProduct });
        // Свойство editableProductIndex получает индекс редактируемого продукта
        this.editableProductIndex = this.productList.indexOf(entry);
      },
      // Функция для удаления продукта
      removeProduct(item) {
        const index = this.productList.indexOf(item);
        this.displayProductForm = false;
        this.editableProduct = false;
        // Из общего массива объектов продукта удаляется выбранный элемент по индексу
        this.productList.splice(index, 1);
      },
      // Функция для показа формы фильтрации продукта
      showFilterForm() {
        this.filterProduct = null;
        this.displayFilterForm = !this.displayFilterForm;
      },
      // Функция для подсчета сумм определенного свойства продукта
      totalProperty(property) {
        if (this.productList.length > 0) {
          const propertySum = this.productList
            .map(elem => elem[`${property}`])
            .reduce((previous, current) => previous + current);
          return propertySum;
        }
        return null;
      },
    },
    computed: {
      // Вычисляемое свойство для подсчета общего итога
      totalProduct() {
        if (this.productList.length > 0) {
          const totalProduct = this.productList
            .map(elem => elem.count * elem.price)
            .reduce((previous, current) => previous + current);
          return totalProduct;
        }
        return null;
      },
      // Вычисляемое свойство для подсчета общего количества продуктов
      totalCount() {
        return this.totalProperty('count');
      },
      // Вычисляемое свойство для подсчета общей цены всех продуктов
      totalPrice() {
        return this.totalProperty('price');
      },
      // Вычисляемое свойство для замены значков при переключении режима добавления продукта
      addProductIcon() {
        if (this.displayProductForm) {
          return 'keyboard_arrow_up';
        }
        return 'add';
      },
      // Вычисляемое свойство для замены описания при переключении режима добавления продукта
      productDescriptionOperation() {
        if (this.editableProduct) {
          return 'Редактирование товара';
        }
        return 'Добавление товара';
      },
      // Вычисляемое свойство для отображения обычного либо отфильтрованного списка продуктов
      tableProductList() {
        if (this.filterProduct) {
          const filterProductList = this.productList.filter(product =>
            product.name.includes(this.filterProduct));
          return filterProductList;
        }
        return this.productList;
      },
    },
  };
</script>
<style scoped>
  .table__icon-container {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .table__input-description {
    position: absolute;
    top: 11px;
    left: -65px;
    font-style: italic;
  }

  .table__filter-container {
    max-width: 327px;
    margin: 0 0 22px 22px;
  }

  .card-table {
    text-align: center;
  }

  @media screen and (min-width: 1200px) {
    .table__input-description {
      left: -24px;
    }
  }
</style>
