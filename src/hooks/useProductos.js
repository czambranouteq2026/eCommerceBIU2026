import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const useProductos = () => {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarProductos = useCallback(async () => {
    setCargando(true)
    setError('')

    const { data, error: errorSupabase } = await supabase
      .from('productos')
      .select('id, nombre, categoria, precio, stock, imagen_url')
      .order('nombre', { ascending: true })

    if (errorSupabase) {
      setError(errorSupabase.message)
      setProductos([])
    } else {
      setProductos(data ?? [])
    }

    setCargando(false)
  }, [])

  const agregarProducto = useCallback(async (producto) => {
    setError('')

    const payload = {
      nombre: producto.nombre?.trim(),
      categoria: producto.categoria?.trim(),
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      imagen_url: producto.imagen_url?.trim() || '',
    }

    const { data, error: errorSupabase } = await supabase
      .from('productos')
      .insert([payload])
      .select('id, nombre, categoria, precio, stock, imagen_url')

    if (errorSupabase) {
      const mensaje = errorSupabase.message || 'No se pudo guardar el producto.'
      setError(mensaje)
      return { success: false, error: mensaje, data: null }
    }

    const nuevoProducto = data?.[0] ?? null

    if (nuevoProducto) {
      setProductos((actual) =>
        [...actual, nuevoProducto].sort((a, b) =>
          a.nombre.localeCompare(b.nombre),
        ),
      )
    }

    return { success: true, error: '', data: nuevoProducto }
  }, [])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  return {
    productos,
    cargando,
    error,
    recargar: cargarProductos,
    agregarProducto,
  }
}
