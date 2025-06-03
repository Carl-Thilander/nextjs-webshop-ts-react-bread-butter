import { Dialog } from "@mui/material";
import AddProductForm from "../../../components/products/product-form";

export default function NewProductPage() {
  return (
    <Dialog disableScrollLock open>
      <AddProductForm />
    </Dialog>
  );
}
