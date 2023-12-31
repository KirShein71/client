import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import {
  fetchOneProduct,
  updateProduct,
  fetchCategories,
  fetchWineries,
  fetchYears,
  fetchBrands,
} from '../../http/productApi';
import uuid from 'react-uuid';
import UpdateProperties from './UpdateProperties';
import { createProperty, updateProperty, deleteProperty } from '../../http/productApi';

const defaultValue = { name: '', price: '', category: '', winery: '', year: '', brand: '' };
const defaultValid = {
  name: null,
  price: null,
  category: null,
  winery: null,
  year: null,
  brand: null,
};

const isValid = (value) => {
  const result = {};
  const pattern = /^[1-9][0-9]*$/;
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'price') result.price = pattern.test(value.price.trim());
    if (key === 'category') result.category = pattern.test(value.category);
    if (key === 'winery') result.winery = pattern.test(value.winery);
    if (key === 'year') result.year = pattern.test(value.year);
    if (key === 'brand') result.brand = pattern.test(value.brand);
  }
  return result;
};

const updateProperties = async (properties, productId) => {
  for (const prop of properties) {
    const empty = prop.name.trim() === '' || prop.value.trim() === '';
    // если вдруг старая хар-ка оказалась пустая — удалим ее на сервере
    if (empty && prop.id) {
      try {
        await deleteProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    /*
     * Если у объекта prop свойство append равно true — это новая хар-ка, ее надо создать.
     * Если у объекта prop свойство change равно true — хар-ка изменилась, ее надо обновить.
     * Если у объекта prop свойство remove равно true — хар-ку удалили, ее надо удалить.
     */
    if (prop.append && !empty) {
      try {
        await createProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.change && !prop.remove) {
      try {
        await updateProperty(productId, prop.id, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.remove) {
      try {
        await deleteProperty(productId, prop.id);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
  }
};

const UpdateProduct = (props) => {
  const { id, show, setShow, setChange } = props;

  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = React.useState(null);
  const [wineries, setWineries] = React.useState(null);
  const [years, setYears] = React.useState(null);
  const [brands, setBrands] = React.useState(null);

  // выбранное для загрузки изображение товара
  const [image, setImage] = React.useState(null);

  // список характеристик товара
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    if (id) {
      // нужно получить с сервера данные товара для редактирования
      fetchOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            winery: data.wineryId.toString(),
            year: data.yearId.toString(),
            brand: data.brandId.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          // для удобства работы с хар-ми зададим для каждой уникальный идентификатор
          // и доп.свойства, которые подскажут нам, какой http-запрос на сервер нужно
          // выполнить — добавления, обновления или удаления характеристики
          setProperties(
            data.props.map((item) => {
              // при добавлении новой хар-ки свойство append принимает значение true
              // при изменении старой хар-ки свойство change принимает значение true
              // при удалении старой хар-ки свойство remove принимает значение true
              return { ...item, unique: uuid(), append: false, remove: false, change: false };
            }),
          );
        })
        .catch((error) => alert(error.response.data.message));
      // нужно получить с сервера список категорий и список брендов
      fetchCategories().then((data) => setCategories(data));
      fetchWineries().then((data) => setWineries(data));
      fetchYears().then((data) => setYears(data));
      fetchBrands().then((data) => setBrands(data));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);

    // если введенные данные прошли проверку — можно отправлять их на сервер
    if (correct.name && correct.price && correct.category && correct.winery && correct.year) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('price', value.price.trim());
      data.append('categoryId', value.category);
      data.append('wineryId', value.winery);
      data.append('yearId', value.year);
      data.append('brandId', value.brand || 0);
      if (image) data.append('image', image, image.name);

      // нужно обновить, добавить или удалить характеристики и обязательно дождаться
      // ответа сервера — поэтому функция updateProperties() объявлена как async, а
      // в теле функции для выполнения действия с каждой хар-кой используется await
      if (properties.length) {
        await updateProperties(properties, id);
      }

      updateProduct(id, data)
        .then((data) => {
          // сбрасываем поле загрузки изображения, чтобы при сохранении товара,
          // когда новое изображение не выбрано, не загружать старое повтороно
          event.target.image.value = '';
          // в принципе, мы могли бы сбросить все поля формы на дефолтные значения, но
          // если пользователь решит отредатировать тот же товар повтороно, то увидит
          // пустые поля формы — http-запрос на получение данных для редактирования мы
          // выполняем только тогда, когда выбран новый товар (изменился id товара)
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            winery: data.wineryId.toString(),
            year: data.yearId.toString(),
            brand: data.brandId.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          // мы получим актуальные значения хар-тик с сервера, потому что обновление
          // хар-тик завершилось еще до момента отправки этого http-запроса на сервер
          setProperties(
            data.props.map((item) => {
              return { ...item, unique: uuid(), append: false, remove: false, change: false };
            }),
          );
          // закрываем модальное окно редактирования товара
          setShow(false);
          // изменяем состояние, чтобы обновить список товаров
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование товара</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название товара..."
            className="mb-3"
          />
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="category"
                value={value.category}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.category === true}
                isInvalid={valid.category === false}>
                <option value="">Категория</option>
                {categories &&
                  categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="brand"
                value={value.brand}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.category === true}
                isInvalid={valid.category === false}>
                <option value="">На главной</option>
                {brands &&
                  brands.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="winery"
                value={value.winery}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.winery === true}
                isInvalid={valid.winery === false}>
                <option value="">Винодельня</option>
                {wineries &&
                  wineries.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="year"
                value={value.year}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.year === true}
                isInvalid={valid.year === false}>
                <option value="">Год</option>
                {years &&
                  years.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="price"
                value={value.price}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.price === true}
                isInvalid={valid.price === false}
                placeholder="Цена товара..."
              />
            </Col>
            <Col>
              <Form.Control
                name="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
                placeholder="Фото товара..."
              />
            </Col>
          </Row>
          <UpdateProperties properties={properties} setProperties={setProperties} />
          <Row>
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProduct;
