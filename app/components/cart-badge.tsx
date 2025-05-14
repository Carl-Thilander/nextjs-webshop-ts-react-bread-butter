import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useCart } from "@/hooks/useCart";

const CartBadge = () => {
  const { cartCount } = useCart(); // Dynamically get the cart count

  return (
    <Badge
      badgeContent={cartCount}
      invisible={cartCount === 0}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "background.paper",
          color: "text.primary",
          fontSize: { xs: "0.8rem", md: "1rem" },
          height: { xs: 16, sm: 18, md: 25 },
          minWidth: { xs: 15, md: 25 },
          top: { xs: -2, md: 0 },
          right: { xs: 0, sm: 15, md: 20 },
          borderRadius: "50%",
        },
      }}
    >
      <ShoppingCartIcon
        sx={{
          fontSize: { xs: 23, sm: 28, md: 40 },
          mx: { sm: 2 },
          color: "text.primary",
        }}
      />
    </Badge>
  );
};

export default CartBadge;
