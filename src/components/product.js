
function Shop(props){
    const [productIds, setProductIds] = useState([props.id+'-prod1',props.id+'-prod2',props.id+'-prod3'])

    return
    ( 
        <div className = "col">
            {productIds.map((id) => (
                <div className = {"row"}>
                    <Product key = {id} id = {id}/>
                </div>
            ))}
           
        </div>
    );
}

function Product(props) {
    const [name, setName] = useState("Product");
    const [description, setDescription] = useState("Product's Description");
    const [price, setPrice] = useState("$5");

    const headerRef = createRef()
    const descriptionRef = createRef()
    const priceRef = createRef();

    return
    ( 
        <div className = "col">
            <div className = "row">
               <PictureFrame id = {props.id+'-picture'}/>
            </div>
            <div className = "row">
                <ContentEditable
                    innerRef={headerRef}
                    html={name} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(evt)=>{setName(evt.target.value)}} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                />
            </div>
            <div className = "row">
                <div className = "col"> 
                    <button className = "btn btn-primary"><FontAwesomeIcon icon {faShoppingCart}/>Buy Now</button>
                    {/* Add to cart just gets the cart and updates it. That's all. */}
                </div>
                <div className = "col"> 
                    <button className = "btn btn-primary"><FontAwesomeIcon icon {faCartPlus}/>Add To Cart</button>
                </div>
                <div className = "col"> 
                    <ContentEditable
                        innerRef={priceRef}
                        html={price} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={(evt)=>{setName(evt.target.value)}} // handle innerHTML change
                        tagName='header' // Use a custom HTML tag (uses a div by default)
                    />
                </div>
            </div>
            <div className = "row">
                <ContentEditable
                    innerRef={descriptionRef}
                    html={description} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(evt)=>{setName(evt.target.value)}} // handle innerHTML change
                    tagName='header' // Use a custom HTML tag (uses a div by default)
                />
            </div>
        </div>
    );
  }
