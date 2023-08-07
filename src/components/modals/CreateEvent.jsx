import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createEvent } from '../../http/productApi';

const defaultValue = { name: '', place: '', link: '', description: '', date: '', responsible: '' };
const defaultValid = {
  name: null,
  place: null,
  link: null,
  description: null,
  date: null,
  responsible: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'place') result.place = value.place.trim() !== '';
    if (key === 'link') result.link = value.link.trim() !== '';
    if (key === 'description') result.description = value.description.trim() !== '';
    if (key === 'date') result.date = value.date.trim() !== '';
    if (key === 'responsible') result.responsible = value.responsible.trim() !== '';
  }
  return result;
};

const CreateEvent = (props) => {
  const { show, setShow, setChange } = props;

  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = React.useState(null);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = isValid(value);
    setValid(correct);

    // все поля формы прошли проверку, можно отправлять данные на сервер
    if (
      correct.name &&
      correct.place &&
      correct.link &&
      correct.description &&
      correct.date &&
      correct.responsible
    ) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('place', value.place.trim());
      data.append('link', value.link.trim());
      data.append('description', value.description.trim());
      data.append('date', value.date.trim());
      data.append('responsible', value.responsible.trim());
      if (image) data.append('image', image, image.name);

      createEvent(data)
        .then((data) => {
          // приводим форму в изначальное состояние
          event.target.image.value = '';
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
        <Modal.Title>Новое мероприятие</Modal.Title>
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
                name="place"
                value={value.place}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.place === true}
                isInvalid={valid.place === false}
                placeholder="Место проведения..."
              />
            </Col>
            <Col>
              <Form.Control
                name="date"
                value={value.date}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.date === true}
                isInvalid={valid.date === false}
                placeholder="Дата проведения..."
              />
            </Col>
            <Col>
              <Form.Control
                name="link"
                value={value.link}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.link === true}
                isInvalid={valid.link === false}
                placeholder="Ссылка на оплату..."
              />
            </Col>
            <Col>
              <Form.Control
                name="responsible"
                value={value.responsible}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.responsible === true}
                isInvalid={valid.responsible === false}
                placeholder="Отвественный..."
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
          <Col>
            <textarea
              name="description"
              multiline={true}
              value={value.description}
              onChange={(e) => handleInputChange(e)}
              isValid={valid.description === true}
              isInvalid={valid.description === false}
              placeholder="Описание..."
              style={{ height: '500px', width: '100%' }}
            />
          </Col>
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

export default CreateEvent;
