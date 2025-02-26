import { Button, Card, Flex, Space, Typography } from "antd";
import { Globe, Heart, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const { Text } = Typography;

export function UserCard({ user, handleEdit, handleDelete, handleLike }) {
  return (
    <Card
      hoverable={false}
      style={{ borderRadius: 0 }}
      styles={{ body: { padding: 0 } }}>
      <Flex vertical>
        <Flex
          style={{ width: "100", height: "100%", backgroundColor: "skyblue" }}
          justify="center"
          align="center">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}&mouth=smile,twinkle,serious`}
          />
        </Flex>

        <Flex
          vertical
          style={{
            paddingInline: "1rem",
            paddingBlock: "1rem",
          }}>
          <Typography.Title level={4} style={{ marginBottom: "0.5rem" }}>
            {user.name}
          </Typography.Title>

          <Space>
            <Mail
              size={18}
              style={{
                color: "#9f9fa9",
              }}
            />
            <Text>{user.email}</Text>
          </Space>
          <Space>
            <Phone
              size={18}
              style={{
                color: "#9f9fa9",
              }}
            />
            <Text>{user.phone}</Text>
          </Space>
          <Space>
            <Globe
              size={18}
              style={{
                color: "#9f9fa9",
              }}
            />
            <Text>{user.website}</Text>
          </Space>
        </Flex>
        <Flex
          justify="space-between"
          style={{
            paddingBlock: "0.8rem",
            backgroundColor: "#fafafa",
            height: "100%",
          }}>
          <Button type="link" onClick={() => handleLike(user)}>
            <Heart
              fill={user.isLiked ? "red" : "transparent"}
              color={user.isLiked ? "red" : "#9f9fa9"}
              size={20}
            />
          </Button>
          <Button type="link" onClick={() => handleEdit(user)}>
            <Pencil
              size={20}
              style={{
                color: "#9f9fa9",
              }}
            />
          </Button>
          <Button type="link" onClick={() => handleDelete(user.id)}>
            <Trash2
              size={20}
              style={{
                color: "#9f9fa9",
              }}
            />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};
