import { TopProduct } from '../types';

interface TopProductsTableProps {
  products: TopProduct[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 overflow-hidden flex flex-col">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Top Products Added to Cart</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-3 border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Product ID
              </th>
              <th className="pb-3 border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-right">
                Times Added
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="py-4 border-b border-zinc-100 dark:border-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                  {product.productId}
                </td>
                <td className="py-4 border-b border-zinc-100 dark:border-zinc-800/50 text-sm text-zinc-500 dark:text-zinc-400 text-right">
                  {product.timesAdded}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={2} className="py-8 text-center text-sm text-zinc-500">
                  No products data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
