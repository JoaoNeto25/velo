import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

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

    // Test Data
    // const order = 'VLO-9WB0DE'
    
    const order = {
      code: 'VLO-9WB0DE',
      status: 'APROVADO',
      color: 'Lunar White',
      wheelType: 'aero Wheels',
      customer: {
        name: 'Joao Neto',
        email: 'neto@qa.com'
      },
      paymentMethod: 'À Vista'
    }
    
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.code)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
    // Assert   
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
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
  })
  
  test('Deve consultar um pedido REPROVADO', async ({ page }) => {

    // Test Data
    // const order = 'VLO-DLKVX6' 
    const order = {
      code: 'VLO-DLKVX6',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      paymentMethod: 'À Vista'
    }
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.code)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
    // Assert   
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
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
  })   
    
  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    
      const order = generateOrderCode()
    
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
      await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
      `)
    })
    
})

