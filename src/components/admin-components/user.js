/**
 * author :safvan p k
 * discription: view and edit the users list and update user role
 * 
 */


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Tooltip,
  Table,
  Popconfirm,
  message,
  Space,
  Select,
  Modal,
  Form,
} from "antd";

import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  deleteUser,
  getAllUserDatas,
  updateUserRoles,
} from "../../utils/adminApi";


const { Option } = Select;

function UserDetails() {

  const [userId, setuserId] = useState();

  const [userModalOpen, setUserModalOpen] = useState(false);

  const [spinning, setSpinning] = useState(false);

  const [userData, setuserData] = useState([]);

  const [form] = Form.useForm();

  const [current, setCurrent] = useState(1);

  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(10);

  const {} = useSelector((state) => state.admin);

  //delete user 

  const eliminateUser = (id) => {
    removeUser(id);
  };
  

  //update user role(admin,user,employ etc.)

  const updateUserRol = async (id, data) => {
    const items = await updateUserRoles(id, data);

    if (items.error) {
  
      message.error("Something went wrong");
    } else {
      setSpinning(false) 
      message.success("User role Updated Successfully");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };
  const removeUser = async (id) => {
    const items = await deleteUser(id);

    if (items.error) {
      setUserModalOpen(false);
      message.error("Something went wrong");
    } else {
      message.success("User eliminated");
      setUserModalOpen(false);
    }
  };

  const getAllUsers = async (current,limit) => {
    const items = await getAllUserDatas(current,limit);
 setTotal(items.filterdUserCount)
    setuserData(
      items.user.map((data) => ({
        name: data.name,
        email: data.email,
        mobileNumber: 987456321,
        pendingOrder: 5,
        totalOreder: 10,
        role: data.role,
        id: data._id,
      }))
    );
  };
  const handlePage=(current,limit)=>{
    setCurrent(current)
    setLimit(limit)
    console.log(limit,current,"current page")
    getAllUsers(current,limit)


  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const updaterole = (data) => {
    userOk(data);
  };

  const showUserModal = (id) => {
    setUserModalOpen(true);
    setuserId(id);
  };

  const userOk = (data) => {
    setSpinning(true)
    updateUserRol(userId, data);
    getAllUsers(current,limit);
    
  };

  const userCancel = () => {
    setUserModalOpen(false);
  };

  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      fixed: "left",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
      width: 150,
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "id",
      width: 150,
    },
    {
      title: "pending Orders",
      dataIndex: "pendingOrder",
      key: "id",
      width: 150,
    },
    {
      title: "Total Orders",
      dataIndex: "totalOreder",
      key: "id",
      width: 150,
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "id",
      width: 150,
    },

    {
      title: "Action",
      fixed: "right",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Link>
              <FaEdit
                onClick={() => {
                  showUserModal(id);
                }}
              ></FaEdit>
            </Link>
          </Tooltip>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => eliminateUser(id)}
          >
            {" "}
            <Tooltip title="Delete">
              <Link>
                <FaTrash></FaTrash>
              </Link>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
 
    getAllUsers(current,limit);
  }, []);

  return (
    <div>
      <div>
        <Table
          dataSource={userData}
          columns={userColumns}
          pagination={{
            pageSize:limit,
            current:current,
            total:total,
            onChange:(current,limit)=>{handlePage(current,limit)},
       
          
          }}
          scroll={{ x: 1500 }}
        />
      </div>

      {/* user role editing model */}

      <Modal
        title="Select User Role"
        open={userModalOpen}
        onOk={userOk}
        onCancel={userCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={updaterole}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select style={{ width: "calc(85%)" }}>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
              <Option value="techTeame">Tech Teame</Option>
              <Option value="employ">Employ</Option>
            </Select>
          </Form.Item>
          <div className="create-product">
            <div className="button">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={spinning}>
                  Update UserRole
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {" "}
                <Button type="primary" onClick={userCancel}>
                  cancel
                </Button>
              </Form.Item>
            </div>{" "}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default UserDetails;
