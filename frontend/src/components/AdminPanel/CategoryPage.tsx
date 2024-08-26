import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
}

const CategoryPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:5000/api/categories/get-all');
        setCategories(response.data);
      } catch (error) {
        console.error('Kategorileri getirme hatası:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setNewCategory('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      let response;
      if (editingCategory) {
        response = await axios.put(`http://localhost:5000/api/categories/update-category/${editingCategory._id}`, { name: newCategory });
      } else {
        response = await axios.post('http://localhost:5000/api/categories/add-category', { name: newCategory });
      }

      if (response.status === 200 || response.status === 201) {
        const category = response.data;
        if (editingCategory) {
          setCategories(categories.map(c => (c._id === category._id ? category : c)));
        } else {
          setCategories([...categories, category]);
        }
        setNewCategory('');
        setEditingCategory(null);
        setOpen(false);
        setSnackbarMessage('Kategori başarıyla kaydedildi.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Kategori kaydetme hatası:', error);
      setSnackbarMessage('Kategori kaydetme hatası.');
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setOpen(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/categories/delete-category`, { data: { categoryId: category._id } });
      if (response.status === 200) {
        setCategories(categories.filter(c => c._id !== category._id));
        setSnackbarMessage('Kategori başarıyla silindi.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Kategori silme hatası:', error);
      setSnackbarMessage('Kategori silme hatası.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography sx={{ mx: 2, mt: 5, fontWeight: 600, fontSize: '2rem' }}>
        Kategoriler
      </Typography>
      <Button
        sx={{ mx: 2, mt: 2 }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddCategory}
      >
        Kategori Ekle
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>AD</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(c => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleCategoryEdit(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCategory(c)}>
                    <DeleteForeverIcon sx={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCategory ? 'Kategoriyi Düzenle' : 'Kategori Ekle'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Kategori Adı"
            fullWidth
            variant="outlined"
            value={newCategory}
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

export default CategoryPage;
