import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    fontSize: 20,
    fontWeight: "400",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ReceiptProps {
  items: Array<any>;
  totalSum: number;
}

export default function Receipt({ items, totalSum }: ReceiptProps) {
  return (
    <>
      <Typography
        variant="h2"
        component="p"
        sx={{ fontSize: "1.5rem", fontWeight: "500", mb: "1.5rem" }}
      >
        Your order
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="order-overview">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Sum</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <StyledTableRow key={item.title}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  {item.title}
                </StyledTableCell>
                <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {(item.quantity * item.price).toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="right">
                <strong>Total</strong>
              </StyledTableCell>
              <StyledTableCell align="right">
                <strong>{totalSum.toFixed(2)} €</strong>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
