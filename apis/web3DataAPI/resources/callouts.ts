export const throughputLimitInfoMessage = `
> 🚧 429 에러가 발생했나요? 구독 중인 플랜을 확인하세요!
> 429 에러는 구독 중인 플랜의 Throughput 제한을 초과했을 때 발생할 수 있습니다. 
> 예를 들어, 무료 플랜은 초당 200CU의 제한이 있기 때문에, 무료 플랜을 사용할 경우 CU 소비량이 350인 API를 호출하면 429 오류가 발생할 수 있습니다.
> Compute Unit Costs 페이지에서 사용 중인 API의 CU 소비량을 확인하고, 더 많은 Throughput이 필요하다면 상위 플랜으로 업그레이드하는 것을 고려하세요!
> 👉 [Compute Unit Costs 페이지로 이동하기](https://developer.nodit.io/docs/compute-unit-costs)
`;

export const onlyEthereumMainnetInfoMessage = `
> 🚧 사용 시 네트워크를 확인하세요!
>
> 이 API는 오직 Ethereum Mainnet에서만 지원되며, 다른 네트워크에서는 사용할 수 없습니다. 사용 시 네트워크를 확인해주세요.
`;

export const onlyEthereumMainnetLuniverseMainnetInfoMessage = `
> 🚧 사용 시 네트워크를 확인하세요!
>
> 이 API는 오직 Ethereum Mainnet, TheBalance Mainnet 에서만 지원되며, 다른 네트워크에서는 사용할 수 없습니다. 사용 시 네트워크를 확인해주세요.
`;

export const decodeInfoMessage = `
> 🚧 decodeInput 사용 시 주의사항
>
> decodeInput 필드는 트랜잭션의 input 필드를 해석하여 결과를 제공합니다. 그러나 서로 다른 함수가 같은 함수 선택자(function selector)를 사용할 수 있기 때문에, 제공된 결과가 실제로 호출된 함수와 일치하지 않을 가능성이 있습니다. 따라서, ERC 표준 규격과 다른 함수의 경우 추가적인 검증 과정을 거치는 것을 권장 드립니다.
`;
