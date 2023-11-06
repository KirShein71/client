import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createProject } from '../../http/productApi';

const defaultValue = {
  name: '',
  agreement_date: '',
  design_period: '',
  expiration_date: '',
  installation_period: '',
  note: '',
};
const defaultValid = {
  name: null,
  agreement_date: null,
  design_period: null,
  expiration_date: null,
  installation_period: null,
  note: null,
};

const isValid = (value) => {
  const result = {};
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== '';
    if (key === 'agreement_date') result.agreement_date = value.agreement_date.trim() !== '';
    if (key === 'design_period') result.design_period = value.design_period.trim() !== '';
    if (key === 'expiration_date') result.expiration_date = value.expiration_date.trim() !== '';
    if (key === 'installation_period')
      result.installation_period = value.installation_period.trim() !== '';
    if (key === 'note') result.note = value.note.trim() !== '';
  }
  return result;
};

const CreateBanner = (props) => {
  const { show, setShow, setChange } = props;

  const [value, setValue] = React.useState(defaultValue);
  const [valid, setValid] = React.useState(defaultValid);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const correct = isValid(value);
    setValid(correct);

    if (
      correct.name &&
      correct.agreement_date &&
      correct.design_period &&
      correct.expiration_date &&
      correct.installation_period &&
      correct.note
    ) {
      const data = new FormData();
      data.append('name', value.name.trim());
      data.append('agreement_date', value.agreement_date.trim());
      data.append('design_period', value.design_period.trim());
      data.append('expiration_date', value.expiration_date.trim());
      data.append('installation_period', value.installation_period.trim());
      data.append('note', value.note.trim());

      createProject(data)
        .then((data) => {
          // приводим форму в изначальное состояние
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
        <Modal.Title>Добавить проект</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название проекта"
            className="mb-3"
          />
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="agreement_date"
                value={value.agreement_date}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.agreement_date === true}
                isInvalid={valid.agreement_date === false}
                placeholder="Дата договора"
              />
            </Col>
            <Col>
              <Form.Control
                name="design_period"
                value={value.design_period}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.design_period === true}
                isInvalid={valid.design_period === false}
                placeholder="Срок проектирования"
              />
            </Col>
            <Col>
              <Form.Control
                name="expiration_date"
                value={value.expiration_date}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.expiration_date === true}
                isInvalid={valid.expiration_date === false}
                placeholder="Срок производства"
              />
            </Col>
            <Col>
              <Form.Control
                name="installation_period"
                value={value.installation_period}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.installation_period === true}
                isInvalid={valid.installation_period === false}
                placeholder="Срок монтажа"
              />
            </Col>
            <Col>
              <Col>
                <textarea
                  name="note"
                  value={value.note}
                  onChange={(e) => handleInputChange(e)}
                  isValid={valid.note === true}
                  isInvalid={valid.note === false}
                  placeholder="Примечание"
                  style={{ height: '200px', width: '100%' }}
                />
              </Col>
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
