import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createBanner } from '../../http/productApi';

const defaultValue = { name: '' };
const defaultValid = {
  name: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
  }
  return result;
};

const CreateBanner = (props) => {
  const { show, setShow, setChange } = props;
  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = React.useState(null);

  const handleInputChange = (banner) => {
    const data = { ...value, [banner.target.name]: banner.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (banner) => {
    setImage(banner.target.files[0]);
  };

  const handleSubmit = (banner) => {
    banner.preventDefault();
    const correct = isValid(value);
    setValid(correct);

    // все поля формы прошли проверку, можно отправлять данные на сервер
    if (correct.name) {
      const data = new FormData();
      data.append('name', value.name.trim());
      if (image) data.append('image', image, image.name);
      createBanner(data)
        .then((data) => {
          // приводим форму в изначальное состояние
          banner.target.image.value = '';
          setValue(defaultValue);
          setValid(defaultValid);

          // закрываем модальное окно создания товара
          setShow(false);
          // изменяем состояние, чтобы обновить список товаров
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Новый баннер</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название мероприятия..."
            className="mb-3"
          />
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
                placeholder="Фото товара..."
              />
            </Col>
          </Row>
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

export default CreateBanner;
