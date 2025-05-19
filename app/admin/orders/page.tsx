import { Container } from "@mui/material";
import AdminOrderTable from "./order-table";

export default async function AllOrders() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "background.paper",
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <AdminOrderTable />
    </Container>
  );
}
