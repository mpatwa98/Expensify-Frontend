import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const SampleTable = () => {
  const [dataSource, setDataSource] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setSelectedItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedItem = { ...selectedItem, ...values };
      if (selectedItem) {
        setDataSource((prevDataSource) =>
          prevDataSource.map((item) =>
            item.id === selectedItem.id ? updatedItem : item
          )
        );
      } else {
        updatedItem.id = dataSource.length + 1;
        setDataSource((prevDataSource) => [...prevDataSource, updatedItem]);
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={selectedItem ? 'Edit Item' : 'Add Item'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SampleTable;
