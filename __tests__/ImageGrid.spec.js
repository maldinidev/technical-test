import { mount, flushPromises } from '@vue/test-utils';
import ImageGrid from '../src/components/ImageGrid.vue';
import ImageCard from '../src/components/ImageCard.vue';
import { nextTick } from 'vue';

// Mock the global fetch API
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, download_url: 'https://picsum.photos/id/1/200/300', author: 'Author 1', loaded: false },
          { id: 2, download_url: 'https://picsum.photos/id/2/200/300', author: 'Author 2', loaded: false },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('ImageGrid.vue', () => {
  it('renderiza `ImageCard` para cada imagen en el estado', async () => {
    const wrapper = mount(ImageGrid);
    await flushPromises();

    const cards = wrapper.findAllComponents(ImageCard);
    expect(cards.length).toBe(2); // Verifica que hay 2 imágenes en el estado
  });

  it('elimina una imagen del estado cuando se emite "remove"', async () => {
    const wrapper = mount(ImageGrid);

    // Espera a que las imágenes se carguen y el DOM se actualice
    await flushPromises();

    // Verifica el estado inicial
    expect(wrapper.vm.images.length).toBe(2);

    // Simula la emisión del evento "remove" desde el primer `ImageCard`
    const card = wrapper.findComponent(ImageCard);
    const imageToRemove = wrapper.vm.images[0]; // Primera imagen
    await card.vm.$emit('remove', imageToRemove);

    // Espera la actualización del estado
    await wrapper.vm.$nextTick();

    // Verifica que el estado se haya actualizado
    expect(wrapper.vm.images.length).toBe(1);
    expect(wrapper.vm.images[0].id).not.toBe(imageToRemove.id);
  });

  it('matches the snapshot', async () => {
    const wrapper = mount(ImageGrid);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
