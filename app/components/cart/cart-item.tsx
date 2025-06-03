"use client";
import PublicNumberField from "@/app/components/cart/numberfield-component";
import { CartItem } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
	cartItem: CartItem;
}

export default function CartItemComponent({ cartItem }: Props) {
	const { removeFromCart } = useCart();

	return (
		<Box
			sx={{
				width: "100%",
				position: "relative",
				padding: 1,
				my: 2,
				boxShadow: 2,
				display: "flex",
				flexDirection: "row",
				paddingBlock: 2,
				background: "#fafafa",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: "center",
					mb: 1,
				}}
			>
				<Box
					sx={{
						width: 100,
						height: 100,
						mr: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						component="img"
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "contain",
						}}
						src={cartItem.image}
						alt={cartItem.title}
					/>
				</Box>

				<Box
					sx={{
						paddingBottom: 0.5,
					}}
				>
					<Typography
						gutterBottom
						variant="body2"
						component="div"
						sx={{
							fontSize: "1rem",
							fontWeight: "bold",
							mb: 0.5,
							mt: 1,
							paddingBottom: 0.5,
						}}
					>
						{cartItem.title}
					</Typography>

					<Typography variant="body2" sx={{ fontWeight: "medium" }}>
						{cartItem.price} €
					</Typography>
					{cartItem.stock === 0 && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", fontWeight: "bold" }}
						>
							Out of stock
						</Typography>
					)}
					{cartItem.stock > 0 && cartItem.stock < 5 && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", fontWeight: "bold" }}
						>
							Only {cartItem.stock} left
						</Typography>
					)}
				</Box>
			</Box>

			<Box
				sx={{
					position: "absolute",
					bottom: 30,
					right: 25,
				}}
			>
				<PublicNumberField id={cartItem.id} price={cartItem.price} />
			</Box>

			<Box
				sx={{
					position: "absolute",
					top: 10,
					right: 15,
				}}
			>
				<IconButton
					sx={{
						color: "#61371E",
					}}
					onClick={() => removeFromCart(cartItem.id)}
				>
					<DeleteIcon />
				</IconButton>
			</Box>
		</Box>
	);
}
