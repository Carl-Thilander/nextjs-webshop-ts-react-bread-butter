"use client";

import { useCart } from "@/hooks/useCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { IconButton } from "@mui/material";
import { Product } from "@prisma/client";

interface AddToCartButtonProps {
	label?: string;
	product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
	label = "Lägg i kundvagn",
	product,
}) => {
	const { addToCart, showToast } = useCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
    showToast("The product was added to cart!");
  };

	return (
		<IconButton
			onClick={handleAddToCart}
			sx={{
        p: 0,
				color: "text.primary",
				"&:hover": { transform: "scale(1.25)" },
			}}
		>
			<LocalMallIcon sx={{fontSize: "1.8rem"}}/>
		</IconButton>
	);
};

export default AddToCartButton;
