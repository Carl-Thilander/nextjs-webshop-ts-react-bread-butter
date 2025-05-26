"use client";
import { CartItem } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import PublicNumberField from "../components/numberfield-component";

interface Props {
	cartItem: CartItem;
}

export default function CartItemComponent({ cartItem }: Props) {
	const { removeFromCart } = useCart();

	return (
		<Card
			sx={{
				maxWidth: { xs: "295px", sm: "100%" },
				position: "relative",
				padding: 1,
				my: 2,
				boxShadow: 2,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					paddingTop: 1,
					paddingBottom: 1,
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
							borderRadius: "50%",
							padding: 0.5,
							mr: 2,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0,
						}}
					>
						<CardMedia
							component="img"
							sx={{
								width: "100%",
								height: "100%",
								borderRadius: "50%",
								objectFit: "cover",
								padding: 0.5,
								border: "2px solid #9C8173",
							}}
							image={cartItem.image}
							title={cartItem.title}
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
						bottom: 8,
						right: 16,
						zIndex: 1,
					}}
				>
					<PublicNumberField id={cartItem.id} price={cartItem.price} />
				</Box>

				<Box
					sx={{
						position: "absolute",
						top: 10,
						right: 0,
						zIndex: 1,
					}}
				>
					<Button
						onClick={() => removeFromCart(cartItem.id)}
						startIcon={<Delete />}
					></Button>
				</Box>
			</Box>
		</Card>
	);
}
