import { mount } from '@vue/test-utils';
import ImageCard from '../src/components/ImageCard.vue';

describe('ImageCard.vue', () => {
  const mockImage = {
    id: 1,
    download_url: 'https://picsum.photos/id/1/200/300',
    author: 'Author 1',
    loaded: false,
  };

  it('renderiza la imagen correctamente', () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockImage.download_url);
    expect(img.attributes('alt')).toBe(mockImage.author);
  });

  it('emite el evento "remove" al hacer clic en el área de eliminación', async () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const removeOverlay = wrapper.find('.group-hover\\:opacity-85');
    await removeOverlay.trigger('click');

    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')[0]).toEqual([mockImage]);
  });

  it('marca la imagen como cargada al disparar el evento load', async () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const img = wrapper.find('img');
    await img.trigger('load');

    expect(mockImage.loaded).toBe(true);
  });

  it('applies the correct classes based on the "loaded" state', async () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: { ...mockImage, loaded: false },
      },
    });

    const img = wrapper.find('img');
    expect(img.classes()).toContain('opacity-0');
    expect(img.classes()).toContain('scale-95');

    // Simulate the image load
    await img.trigger('load');
    expect(img.classes()).toContain('opacity-100');
    expect(img.classes()).toContain('scale-100');
  });

  it('matches the snapshot', () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
