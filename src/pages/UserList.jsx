import { Col, Flex, Row, Space, Spin } from "antd";
import { EditUserModal, UserCard } from "../modules/UserList/components";
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

const avatarList = [
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryan",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Amaya",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexander",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Easton",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Kingston",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Brooklynn",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Katherine",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
];

export function UserList() {
  const [data, setData] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedUsers = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
          avatar: avatarList[user.id - 1],
          isLiked: false,
        }));
        setData(formattedUsers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    setisOpen(true);
    setEditingUser(user);
  };

  const handleCancel = () => {
    setisOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (data) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === editingUser?.id ? { ...user, ...data } : user
      )
    );
    setisOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    setData((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleLike = (data) => {
    console.log(data);

    setData((prev) =>
      prev.map((user) =>
        user.id === data?.id ? { ...data, isLiked: !data.isLiked } : user
      )
    );
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Space>
          <Spin size="large" />
          Loading...
        </Space>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        Error: {error.message}
      </Flex>
    );
  }

  return (
    <>
      <Row
        gutter={[24, 24]}
        style={{ paddingBlock: "1rem", paddingInline: "1rem" }}>
        {data.map((user) => (
          <Col
            key={user.id}
            xs={24} // 1 card per row on mobile
            md={8} // 3 cards per row on medium screens
            lg={6} // 4 cards per row on large screens
            className="w-full">
            <UserCard
              key={user.id}
              user={user}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          </Col>
        ))}
      </Row>
      <EditUserModal
        user={editingUser}
        open={isOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
}
