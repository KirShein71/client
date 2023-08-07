import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createWinery, fetchWinery, updateWinery } from '../../http/productApi';

const CreateWinery = (props) => {
  const { id, show, setShow, setChange } = props;

  const [name, setName] = React.useState('');
  const [valid, setValid] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      fetchWinery(id)
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
        // закрываем модальное окно создания-редактирования бренда
        setShow(false);
        // изменяем состояние родителя, чтобы обновить список брендов
        setChange((state) => !state);
      };
      const error = (error) => alert(error.response.data.message);
      id
        ? updateWinery(id, data).then(success).catch(error)
        : createWinery(data).then(success).catch(error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Редактирование' : 'Создание'} винодельни</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Название винодельни..."
            className="mb-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateWinery;
