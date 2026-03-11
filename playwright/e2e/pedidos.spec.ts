import { test } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrdersLockupPage'

test.describe('Consultar Pedido', () => {

  let orderLockupPage: OrderLockupPage
  test.beforeEach(async ({ page }) => {

    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()
        
    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validatePageLoaded()
  })

  test('Deve consultar um pedido aprovado', async ({ page }) => {

     const order: OrderDetails = {
      number: 'VLO-9WB0DE',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao Neto',
        email: 'neto@qa.com'
      },
      payment: 'À Vista'
    }
    
    await orderLockupPage.searchOrder(order.number)    
    
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.expectStatusBadge(order.status)
  })
  
  test('Deve consultar um pedido reprovado', async ({ page }) => {

    const order: OrderDetails = {
      number: 'VLO-DLKVX6',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)
    
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.expectStatusBadge(order.status)
  }) 
  
  test('Deve consultar um pedido em análise', async ({ page }) => {

    const order: OrderDetails = {
      number: 'VLO-3IIMWX',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao Da Silva',
        email: 'joao@silva.com'
      },
      payment: 'À Vista'
    }
    await orderLockupPage.searchOrder(order.number)
    
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.expectStatusBadge(order.status)
  })
    
  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    
    const order = generateOrderCode()
  
    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })
  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await orderLockupPage.searchOrder(orderCode)
    await orderLockupPage.validateOrderNotFound()
  })    
})