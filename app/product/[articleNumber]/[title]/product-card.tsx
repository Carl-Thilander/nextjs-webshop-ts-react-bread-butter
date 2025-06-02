import AddToCartButton from "@/app/components/buttons/add-to-cart-button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Product } from "@prisma/client";

type ProductCardProps = {
	product: Product & {
		categories: { id: string; name: string }[];
	};
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Card
			sx={{
				width: 250,
				height: 340,
				backgroundColor: "#f5f0ea",
				boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
				display: "flex",
				flexDirection: "column",
				gap: 1,
				position: "relative",
				":hover": {
					transform: "scale(1.02)",
					boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
				},
				padding: 0,
			}}
		>
			<CardMedia
				component="img"
				sx={{
					height: 220,
					width: 150,
					mx: "auto",
					mt: "1rem",
					borderRadius: "0.25rem",
				}}
				image={product.image}
				alt={product.title}
			/>

			<CardContent
				sx={{
					borderRadius: "0.25rem",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography gutterBottom component="div" sx={{ fontSize: 18 }}>
						{product.title}
					</Typography>
					<CardActions sx={{ pt: 0, mt: 0 }}>
						<AddToCartButton product={product} disabled={product.stock === 0} />
					</CardActions>
				</Box>
				<Typography variant="body2">{product.price} €</Typography>

				<Box>
					{product.stock === 0 && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", fontWeight: "bold" }}
						>
							Out of stock
						</Typography>
					)}
					{product.stock > 0 && product.stock < 5 && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", fontWeight: "bold" }}
						>
							Only {product.stock} left
						</Typography>
					)}

					{product.stock >= 5 && (
						<Typography variant="caption" sx={{ visibility: "hidden" }}>
							placeholder
						</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
