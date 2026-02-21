import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage} from '../support/pages/OrdersLockupPage'


/// AAA - Arrange, Act, Assert

test.describe('Consultar Pedido', () => {

  test.beforeEach(async ({ page }) => {
        // Arrange
        await page.goto('http://localhost:5173/') 
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('Deve consultar um pedido aprovado', async ({ page }) => {

    const order = {
      code: 'VLO-9WB0DE',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheelType: 'aero Wheels',
      customer: {
        name: 'Joao Neto',
        email: 'neto@qa.com'
      },
      paymentMethod: 'À Vista'
    }
    
    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.code)
    
    // Assert   
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.paymentMethod}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectStatusBadge(order.status)
  })
  
  test('Deve consultar um pedido reprovado', async ({ page }) => {

    const order = {
      code: 'VLO-DLKVX6',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      paymentMethod: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.code)
    
    // Assert   
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.paymentMethod}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectStatusBadge(order.status)
  }) 
  
  test('Deve consultar um pedido em análise', async ({ page }) => {

    const order = {
      code: 'VLO-3IIMWX',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheelType: 'aero Wheels',
      customer: {
        name: 'Joao Da Silva',
        email: 'joao@silva.com'
      },
      paymentMethod: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.code)
    
    // Assert   
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.paymentMethod}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await orderLockupPage.expectStatusBadge(order.status)
  })
    
  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    
    const order = generateOrderCode()
  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)
  
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `)
  })
    
})