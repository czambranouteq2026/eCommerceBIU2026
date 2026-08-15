import React, { useEffect, useMemo, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { useProductos } from '../../hooks/useProductos'

const ListaProductos = () => {
  const { productos, cargando, error, recargar } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)
  const productosPorPagina = 10

  useEffect(() => {
    setPagina(1)
  }, [busqueda])

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return productos

    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto),
    )
  }, [productos, busqueda])

  const totalPaginas = Math.max(
    1,
    Math.ceil(productosFiltrados.length / productosPorPagina),
  )
  const paginaActual = Math.min(pagina, totalPaginas)

  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * productosPorPagina
    return productosFiltrados.slice(inicio, inicio + productosPorPagina)
  }, [productosFiltrados, paginaActual])

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(precio))

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Lista de productos</strong>
          <div className="small text-body-secondary">
            Productos obtenidos desde Supabase
          </div>
        </div>
        <CButton color="primary" onClick={recargar} disabled={cargando}>
          Actualizar
        </CButton>
      </CCardHeader>

      <CCardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <CFormInput
            type="search"
            placeholder="Buscar producto o categoría..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            style={{ maxWidth: '350px' }}
          />
          <span className="text-body-secondary">
            {productosFiltrados.length} productos
          </span>
        </div>

        {cargando && (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <p className="mt-3">Cargando productos...</p>
          </div>
        )}

        {!cargando && error && (
          <CAlert color="danger">
            No se pudieron cargar los productos: {error}
          </CAlert>
        )}

        {!cargando && !error && (
          <>
            <CTable align="middle" bordered hover responsive striped>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Imagen</CTableHeaderCell>
                  <CTableHeaderCell>Producto</CTableHeaderCell>
                  <CTableHeaderCell>Categoría</CTableHeaderCell>
                  <CTableHeaderCell>Precio</CTableHeaderCell>
                  <CTableHeaderCell>Stock</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {productosPaginados.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center py-4">
                      No se encontraron productos.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  productosPaginados.map((producto) => (
                    <CTableRow key={producto.id}>
                      <CTableDataCell>{producto.id}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={producto.imagen_url}
                          alt={producto.nombre}
                          width="75"
                          height="55"
                          style={{ objectFit: 'cover', borderRadius: '6px' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{producto.nombre}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="info">{producto.categoria}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span className="fw-semibold text-primary">
                          {formatearPrecio(producto.precio)}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={producto.stock > 0 ? 'success' : 'danger'}>
                          {producto.stock > 0
                            ? `${producto.stock} disponibles`
                            : 'Agotado'}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-between align-items-center">
              <small className="text-body-secondary">
                Página {paginaActual} de {totalPaginas}
              </small>
              <div className="d-flex gap-2">
                <CButton
                  color="secondary"
                  variant="outline"
                  disabled={paginaActual === 1}
                  onClick={() => setPagina((valor) => Math.max(1, valor - 1))}
                >
                  Anterior
                </CButton>
                <CButton
                  color="primary"
                  variant="outline"
                  disabled={paginaActual === totalPaginas}
                  onClick={() =>
                    setPagina((valor) => Math.min(totalPaginas, valor + 1))
                  }
                >
                  Siguiente
                </CButton>
              </div>
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default ListaProductos
