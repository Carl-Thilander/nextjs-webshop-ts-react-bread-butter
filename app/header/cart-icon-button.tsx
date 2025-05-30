import { useCart } from "@/hooks/useCart";
import { Close } from "@mui/icons-material";
import {
	Backdrop,
	Box,
	Divider,
	Drawer,
	IconButton,
	Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartList from "../cart/cart-list";
import CartSummary from "../cart/cart-summary";
import CartBadge from "../components/cart-badge";

export default function MyDrawer() {
	const [open, setOpen] = useState(false);
	const { cartCount } = useCart();
	const pathname = usePathname();

	useEffect(() => {
		const pathsToClose = ["/checkout", "/auth/register"];
		if (pathsToClose.includes(pathname)) {
			setOpen(false);
		}
	}, [pathname]);

	const toggleDrawer = (open: boolean) => () => {
		setOpen(open);
	};

	const router = useRouter();

	return (
		<>
			<IconButton
				onClick={toggleDrawer(true)}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CartBadge />
			</IconButton>

			{/* Backdrop for darkened background */}
			<Backdrop
				open={open}
				sx={{
					zIndex: 1300, // Should be behind the drawer but in front of the rest of the page
					color: "#fff",
					backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for everything behind the drawer
				}}
				onClick={toggleDrawer(false)} // Close the drawer when backdrop is clicked
			/>

			{/* Drawer */}
			<Drawer
				anchor="right"
				open={open}
				onClose={toggleDrawer(false)}
				sx={{
					zIndex: 1301,
					width: { xs: "50%", sm: 400, md: 500 },
					maxWidth: 320,
					maxHeight: "80vh",
					overflowY: "auto",
				}}
			>
				<Box
					sx={{
						width: "100%",
						paddingY: 3,
						backgroundColor: "background.paper",
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					{/* Close button */}
					<IconButton
						onClick={toggleDrawer(false)}
						sx={{
							position: "absolute",
							top: 5,
							right: 7,
							color: "text.primary",
						}}
					>
						<Close />
					</IconButton>

					<Typography
						variant="h5"
						sx={{
							fontFamily: "var(--font-montserrat)",
							paddingLeft: 2,
						}}
					>
						Cart
					</Typography>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							paddingInline: 2,
						}}
					>
						<CartList />
						<Divider sx={{ marginY: 2 }} />
						<CartSummary />
					</Box>
				</Box>
			</Drawer>
		</>
	);
}
