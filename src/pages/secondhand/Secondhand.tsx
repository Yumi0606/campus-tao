import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import ProductCard from '../../components/base/ProductCard';
import { products } from '../../mocks/products';
import { categories, campuses } from '../../mocks/types';
import styles from './Secondhand.module.css';

type SortType = 'default' | 'price-asc' | 'price-desc' | 'newest';

export default function Secondhand() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('default');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedCampus !== 'all') {
      result = result.filter(
        (p) => p.campus === campuses.find((c) => c.id === selectedCampus)?.name
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [selectedCategory, selectedCampus, searchQuery, sortBy]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>二手交易</h1>
          <p className={styles.subtitle}>淘好物，省大钱</p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.publishBtn}>
            <Plus size={20} />
            发布商品
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {/* Categories */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>分类</span>
            <div className={styles.tags}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.tag} ${
                    selectedCategory === cat.id ? styles.tagActive : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Campus */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>校区</span>
            <div className={styles.tags}>
              {campuses.map((campus) => (
                <button
                  key={campus.id}
                  className={`${styles.tag} ${
                    selectedCampus === campus.id ? styles.tagActive : ''
                  }`}
                  onClick={() => setSelectedCampus(campus.id)}
                >
                  {campus.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>排序</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className={styles.select}
            >
              <option value="default">默认</option>
              <option value="price-asc">价格低到高</option>
              <option value="price-desc">价格高到低</option>
              <option value="newest">最新发布</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className={styles.results}>
          <p className={styles.resultCount}>
            共 <strong>{filteredProducts.length}</strong> 件商品
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>没有找到符合条件的商品</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCampus('all');
                setSearchQuery('');
              }}
            >
              重置筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
}