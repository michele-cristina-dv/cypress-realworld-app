 Bug Report - RWA - Real World App


1º Bug: Cadastro com senhas divergentes é aceito

Durante o cadastro de um novo usuário, o sistema permitiu concluir a operação mesmo quando a senha e a confirmação de senha não eram iguais.

 Passos para Reproduzir

Acessar o aplicativo Real World App.

Clicar em Sign Up.

Preencher todos os campos obrigatórios.

Inserir uma senha no campo Password e uma diferente no campo Confirm Password.

Clicar em Cadastrar.

Resultado Esperado

Exibir mensagem de erro clara: “As senhas não coincidem” e impedir a conclusão do cadastro.

❌ Resultado Obtido

Cadastro foi concluído com sucesso, mesmo com senhas divergentes.

Severidade: Alta
Prioridade: Alta

2º Bug: Transferência realizada sem saldo suficiente

O sistema permitiu a realização de transferências de valores superiores ao saldo disponível na conta.

 Passos para Reproduzir

Realizar login no aplicativo.

Acessar New Transaction.

Selecionar o usuário de destino.

Informar um valor maior que o saldo disponível.

Clicar em Pay.

✅ Resultado Esperado

Exibir mensagem de erro: “Saldo insuficiente para realizar a transação” e bloquear a operação.

❌ Resultado Obtido

Transação concluída com sucesso, mesmo sem saldo.

Severidade: Crítica
Prioridade: Alta
3º Bug: Transferência aceita com valor zerado
Descrição

Foi possível realizar uma transação com valor 9999999 o que não faz sentido dentro da lógica de negócios.

Passos para Reproduzir

Realizar login no aplicativo.

Acessar New Transaction.

Selecionar o usuário de destino.

Preencher o valor 0,00.

Clicar em Pay.

✅ Resultado Esperado

Exibir mensagem de erro: “O valor da transação deve ser maior que 0,00” e impedir a operação.

❌ Resultado Obtido

Transação concluída com sucesso, mesmo com valor zerado.

Severidade: Crítica
Prioridade: Alta
 Ambiente de Teste

Navegador: Microsoft Edge

Sistema Operacional: Windows 10

Dispositivo: Desktop

Conexão: Wi-Fi

📌 Conclusão

Os bugs encontrados comprometem tanto a segurança quanto a consistência do sistema. Permitir cadastro com senhas divergentes e transações sem saldo ou com valor zerado pode causar falhas críticas no uso do aplicativo, impactando diretamente a experiência do usuário e a confiabilidade da aplicação.



Data do Report: 07/09/2025
Reportado por: Michele Cristina