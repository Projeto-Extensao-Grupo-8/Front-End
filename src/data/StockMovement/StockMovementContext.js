import { createContext, useContext } from 'react';

export const StockMovementContext = createContext();

export const useStockMovement = () => {
  return useContext(StockMovementContext);
};