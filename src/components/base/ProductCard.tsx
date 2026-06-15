import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import type { Product } from '../../mocks/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const conditionColors: Record<string, string> = {
  '全新': '#22C55E',
  '99新': '#3B82F6',
  '95新': '#F59E0B',
  '9成新': '#E5A84B',
  '8成新': '#999999',
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/secondhand/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <span
          className={styles.condition}
          style={{ background: conditionColors[product.condition] }}
        >
          {product.condition}
        </span>
        {product.isSold && <div className={styles.soldOverlay}>已售</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>¥{product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>¥{product.originalPrice}</span>
          )}
        </div>

        <div className={styles.meta}>
          <span className={styles.tag}>{product.campus}</span>
          <div className={styles.stats}>
            <Eye size={16} />
            <span>{product.views}</span>
            <Heart size={16} />
            <span>{product.likes}</span>
          </div>
        </div>

        <div className={styles.seller}>
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className={styles.avatar}
          />
          <span>{product.seller.name}</span>
        </div>
      </div>
    </Link>
  );
}