import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createYear, fetchYear, updateYear } from '../../http/productApi';

const CreateYear = (props) => {
  const { id, show, setShow, setChange } = props;

  const [name, setName] = React.useState('');
  const [valid, setValid] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      fetchYear(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
        })
        .catch((error) => alert(error.response.data.message));
    } else {
      setName('');
      setValid(null);
    }
  }, [id]);

  const handleChange = (event) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = name.trim() !== '';
    setValid(correct);
    if (correct) {
      const data = {
        name: name.trim(),
      };
      const success = (data) => {
        // закрываем модальное окно создания-редактирования категории
        setShow(false);
        // изменяем состояние родителя, чтобы обновить список категорий
        setChange((state) => !state);
      };
      const error = (error) => alert(error.response.data.message);
      id
        ? updateYear(id, data).then(success).catch(error)
        : createYear(data).then(success).catch(error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Редактирование' : 'Создание'} года</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Ввидите год..."
            className="mb-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateYear;
