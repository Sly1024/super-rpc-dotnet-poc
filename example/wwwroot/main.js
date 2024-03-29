const { SuperRPC } = superrpc;

let rpc, service, squareIt, MyService, testJsHost, testDTO, testServiceInstance, allWindows;

const ws = new WebSocket('ws://localhost:5050/super-rpc');
ws.addEventListener('open', async () => {
    rpc = new SuperRPC(() => (Math.random()*1e17).toString(36));

    rpc.connect({
        sendAsync: (message) => ws.send(JSON.stringify(message)),
        receive: (callback) => {
            ws.addEventListener('message', (msg) => callback(JSON.parse(msg.data)));
        }
    });

    await rpc.requestRemoteDescriptors();

    const jsBridge = rpc.getProxyObject('jsBridge');
    allWindows = await jsBridge.GetAllWindows();



    // rpc.registerHostFunction('jsFunc', (s1, s2) => {
    //     console.log(s1, s2);
    //     return s1 + s2;
    // }, {});


    // rpc.registerHostObject('jsObj', {
    //     Add: (x, y) => x + y
    // }, {
    //     functions: ['Add']
    // });

    // class JsService {
    //     Add(a, b) {
    //         return a + b;
    //     }
    // }

    // rpc.registerHostClass('JsService', JsService, {
    //     ctor: {},
    //     instance: {
    //         functions:[ { name: 'Add', returns: 'async' }]
    //     }
    // });

    // const jsServiceInstance = new JsService();
    // rpc.registerHostFunction('getJsService', () => jsServiceInstance, {});

    // // *** TestService *** //
    // class TestService {
    //     Counter = 0;
    //     Increment() {
    //         this.Counter++;

    //         for (const listener of this.listeners) {
    //             listener(this.Counter);
    //         }
    //     }

    //     listeners = [];

    //     addEventListener(event, listener) {
    //         if (event === 'CounterChanged') {
    //             this.listeners.push(listener);
    //         }
    //     }
    //     removeEventListener(event, listener) {
    //         if (event === 'CounterChanged') {
    //             const idx = this.listeners.indexOf(listener);
    //             if (idx >= 0) {
    //                 this.listeners.splice(idx, 1);
    //             }
    //         }
    //     }
    // }
    // rpc.registerHostClass('TestService', TestService, {
    //     instance: {
    //         functions:[
    //             { name: 'Increment', returns: 'void' },
    //         ],
    //         proxiedProperties: ['Counter'],
    //         events: ['CounterChanged']
    //     }
    // });

    // testServiceInstance = new TestService();
    // rpc.registerHostFunction('getTestService', () => testServiceInstance, {});

    // rpc.sendRemoteDescriptors();

    // service = rpc.getProxyObject('service');
    // squareIt = rpc.getProxyFunction('squareIt');
    // MyService = rpc.getProxyClass('MyService');
    // testJsHost = rpc.getProxyFunction('testJsHost');
    // testDTO = rpc.getProxyFunction('testDTO');
});


