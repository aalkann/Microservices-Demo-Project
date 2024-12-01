function ProductTable({products, handleOrderClick, handleCreateProduct, isAuthenticated}) {
    return (
        <>
            <div className="position-relative">
                {isAuthenticated && (
                    <button className="btn btn-success position-absolute end-0"
                    style={{top: '-50px'}} 
                    onClick={handleCreateProduct}>Add Product</button>
                )}

                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        {isAuthenticated && (<th>Actions</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        {isAuthenticated && 
                        (<td>
                            <button
                            className="btn btn-primary"
                            onClick={() => handleOrderClick(product)}
                            >
                            Order
                            </button>
                        </td>)}
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </>
    )
}

export default ProductTable;