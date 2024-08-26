import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const Products = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, '_id'>>({ name: '', price: 0, quantity: 0, description: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get-all');
        setProducts(response.data);
      } catch (error) {
        console.error('Ürünleri getirme hatası:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: 0, quantity: 0, description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const productData = {
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
        description: newProduct.description
      };

      let response;
      if (editingProduct) {
        response = await axios.put(`http://localhost:5000/api/products/update-product/${editingProduct._id}`, productData);
      } else {
        response = await axios.post('http://localhost:5000/api/products/add-product', productData);
      }

      if (response.status === 200 || response.status === 201) {
        const product = response.data;
        if (editingProduct) {
          setProducts(products.map(p => (p._id === product._id ? product : p)));
        } else {
          setProducts([...products, product]);
        }
        setNewProduct({ name: '', price: 0, quantity: 0, description: '' });
        setEditingProduct(null);
        setOpen(false);
        setSnackbarMessage('Ürün başarıyla kaydedildi.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Ürün kaydetme hatası:', error);
      setSnackbarMessage('Ürün kaydetme hatası.');
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
    }));
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description
    });
    setOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/delete-product/${product._id}`);
      if (response.status === 200) {
        setProducts(products.filter(p => p._id !== product._id));
        setSnackbarMessage('Ürün başarıyla silindi.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Ürün silme hatası:', error);
      setSnackbarMessage('Ürün silme hatası.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography sx={{ mx: 2, mt: 5, fontWeight: 600, fontSize: '2rem' }}>
        Products
      </Typography>
      <Button
        sx={{ mx: 2, mt: 2 }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddProduct}
      >
        Ürün Ekle
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>AD</TableCell>
              <TableCell>FİYAT</TableCell>
              <TableCell>ADET</TableCell>
              <TableCell>TANIM</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleProductEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(p)}>
                    <DeleteForeverIcon sx={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProduct ? 'Ürünü Düzenle' : 'Ürün Ekle'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Ürün Adı"
            name="name"
            fullWidth
            variant="outlined"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Fiyat"
            name="price"
            type="number"
            fullWidth
            variant="outlined"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Adet"
            name="quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Açıklama"
            name="description"
            fullWidth
            variant="outlined"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleClose}>Vazgeç</Button>
          <Button variant="contained" onClick={handleSave}>Kaydet</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Products;
