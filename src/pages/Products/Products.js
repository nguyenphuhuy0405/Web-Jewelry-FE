import classNames from 'classnames/bind'

import styles from './Products.module.scss'
import CardProduct from '~/component/CardProduct/CardProduct'

const cx = classNames.bind(styles)
function Products() {
    return (
        <div className="grid wide">
            <div className="row sm-gutter">
                <div className="col l-3 m-4 c-6">
                    <CardProduct
                        title="Vòng Tay Bạc S925 Patrick Helios Silver Origina"
                        price="2.000.000"
                        img="https://heliosjewels.vn/cdn/shop/files/Marcrame1_460x.jpg?v=1703585830"
                    />
                </div>
                <div className="col l-3 m-4 c-6">
                    <CardProduct
                        title="Vòng Tay Bạc S925 Patrick Helios Silver Origina"
                        price="2.000.000"
                        img="https://heliosjewels.vn/cdn/shop/files/Marcrame1_460x.jpg?v=1703585830"
                    />
                </div>
                <div className="col l-3 m-4 c-6">
                    <CardProduct
                        title="Vòng Tay Bạc S925 Patrick Helios Silver Origina"
                        price="2.000.000"
                        img="https://heliosjewels.vn/cdn/shop/files/Marcrame1_460x.jpg?v=1703585830"
                    />
                </div>
                <div className="col l-3 m-4 c-6">
                    <CardProduct
                        title="Tên sản phẩm"
                        price="2.000.000"
                        img="https://heliosjewels.vn/cdn/shop/files/Marcrame1_460x.jpg?v=1703585830"
                    />
                </div>
            </div>
        </div>
    )
}

export default Products
