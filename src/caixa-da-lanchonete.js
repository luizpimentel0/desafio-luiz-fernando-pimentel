class CaixaDaLanchonete {
  metodosDePagamentoPermitidos = [
    "dinheiro", "debito", "credito"
  ];

  itensExtras = [
    {"codigo" : "chantily", "belongsTo": "cafe"},
    {"codigo" : "queijo", "belongsTo": "sanduiche"}
  ];

  itensPrincipais = [
    {"codigo" : "cafe"},
    {"codigo" : "suco"},
    {"codigo" : "sanduiche"},
    {"codigo" : "salgado"},
  ];

  combos = [
    {"codigo" : "combo1"},
    {"codigo" : "combo2"}
  ];

  itensValores = [
    {"codigo": "cafe", "valor":3},
    {"codigo": "chantily", "valor":1.50},
    {"codigo": "suco", "valor":6.20},
    {"codigo": "sanduiche", "valor":6.50},
    {"codigo": "queijo", "valor":2},
    {"codigo": "salgado", "valor":7.25},
    {"codigo": "combo1", "valor":9.50},
    {"codigo": "combo2", "valor":7.50}
  ];

   verificaSeOItemExiste(pedido) {
    return [this.itensPrincipais, this.combos, this.itensExtras].filter(item => item.some(item => item.codigo === pedido)).length > 0;
  }

  pegaValorDoItem(pedido) {
    const valorItem = this.itensValores.filter(item => item.codigo === pedido);
    return valorItem[0].valor;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const totalDoPedido = [];
    const pedidos = [];
    
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if ((!this.metodosDePagamentoPermitidos.includes(metodoDePagamento)) || (metodoDePagamento === '')) {
      return 'Forma de pagamento inválida!';
    }

    for (let index = 0; index < itens.length; index++) {
      let pedidoAtual = itens[index].split(',');
      let codigoPedido = pedidoAtual[0];
      let quantidadePedido = pedidoAtual[1];
      
      let codigoExiste = this.verificaSeOItemExiste(codigoPedido);

      if (!codigoExiste) {
        return 'Item inválido!';
      }
      if (quantidadePedido.trim() === "0") {
        return 'Quantidade inválida!'
      }
      
      let totalItem = this.pegaValorDoItem(codigoPedido) * quantidadePedido;

      pedidos.push(codigoPedido);
      totalDoPedido.push(totalItem);
    }
    
    for (let index = 0; index < pedidos.length; index++) {
      const codigoPedido = pedidos[index];
      const itemExtra = this.itensExtras.find(item => item.codigo === codigoPedido);
      if (itemExtra) {
        if (!pedidos.includes(itemExtra.belongsTo)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    } 

    const valorTotalDoPedido = totalDoPedido.reduce((ant, atual)=> {
      return ant + atual
    }, 0)

    if (metodoDePagamento === 'debito') {
      return `R$ ${valorTotalDoPedido.toFixed(2).replace('.', ',')}`;
    }

    if (metodoDePagamento === 'credito') {
      const valorTotalDoPedidoComAcrescimo = valorTotalDoPedido * 1.03;
      return `R$ ${valorTotalDoPedidoComAcrescimo.toFixed(2).replace('.', ',')}`
    }

    if (metodoDePagamento === 'dinheiro') {
      const valorTotalDoPedidoComDesconto = valorTotalDoPedido * 0.95;
      return `R$ ${valorTotalDoPedidoComDesconto.toFixed(2).replace('.', ',')}`
    }
  }
}

export { CaixaDaLanchonete };
