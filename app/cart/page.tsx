import { Box, Container, Divider, Typography } from "@mui/material";
import CartList from "./cart-list";
import CartSummary from "./cart-summary";

export default function CartPage() {
	return (
		<Container>
			<Typography
				sx={{
					fontFamily: "var(--font-montserrat)",
					fontSize: 35,
					paddingLeft: 0,
					paddingTop: 2,
				}}
			>
				Cart
			</Typography>
			<Container
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
					bgcolor: { xs: "transparent", sm: "background.paper" },
					marginTop: 2,
					border: { xs: "transparent", sm: "2px solid #9C8173" },
					borderRadius: "0.5rem",
					height: { xs: "auto", sm: "700px" },
				}}
			>
				<CartList />

				<Box sx={{ display: { xs: "none", sm: "block" } }}>
					<Divider orientation="vertical" flexItem />
				</Box>

				<Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
					<Divider orientation="horizontal" />
				</Box>

				<Box
					sx={{
						flex: { xs: "none", sm: 1 },
						p: 2,
						width: "100%",
					}}
				>
					<CartSummary />
				</Box>
			</Container>
		</Container>
	);
}
