export function generateOrderCode() {
    const prefix = 'VLO';
  
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    function randomPart(length) {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  
    const part1 = randomPart(4);
    const part2 = randomPart(2);
  
    return `${prefix}-${part1}${part2}`;
  }
  
// Exemplo de uso
//   const order = generateOrderCode();
//   console.log(order);
  