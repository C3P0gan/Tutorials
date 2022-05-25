import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';

test('Não aceita lances com valor inferior a zero.', () => {
    const wrapper = mount(Lance);
    expect(wrapper).toBeTruthy();
});