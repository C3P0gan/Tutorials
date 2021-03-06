import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';


describe('Um lance sem valor mínimo:', () => {

    test('Não aceita lances com valor inferior a zero.', () => {

        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(-100);
        const lancesEmitidos = wrapper.emitted('novo-lance');
        wrapper.trigger('submit');
        expect(lancesEmitidos).toBeUndefined();
    });
    
    test('Emite um lance quando o valor é superior a zero.', () => {

        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toHaveLength(1);
    });
    
    test('Emite o valor esperado de um lance válido.', () => {

        const wrapper = mount(Lance);
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        const lance = parseInt(lancesEmitidos[0][0]);
        expect(lance).toBe(100);
    });
});


describe('Um lance com valor mínimo:', () => {

    test('Todos os lances devem possuir um valor maior do que o mínimo informado.', () => {

        const wrapper = mount(Lance, {

            propsdata: {

                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toHaveLength(1);
    });

    test('Emite o valor esperado de um lance válido.', () => {

        const wrapper = mount(Lance, {

            propsData: {

                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        const valorDoLance = parseInt(lancesEmitidos[0][0]);
        expect(valorDoLance).toBe(400);
    });

    test('Não são aceitos lances com valores inferiores ao mínimo informado.', async () => {

        const wrapper = mount(Lance, {

            propsData: {

                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        await wrapper.vm.$nextTick(); // Aguarda o DOM ser re-renderizado
        const msgErro = wrapper.find('p.alert').element.textContent;
        const msgEsperada = 'O valor mínimo para o lance é de R$ 300';
        expect(msgErro).toContain(msgEsperada);
    });
});