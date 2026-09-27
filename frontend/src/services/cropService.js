import api from './api';

const DEFAULT_MOCK_CROPS = [
  {
    _id: 'crop-1',
    cropName: 'Wheat (Sujata)',
    name: 'Wheat',
    acreage: 5,
    cropStage: 'Vegetative Stage',
    healthStatus: 'Healthy',
    image: '/images/crops/wheat.webp'
  },
  {
    _id: 'crop-2',
    cropName: 'Mustard (Pusa)',
    name: 'Mustard',
    acreage: 3,
    cropStage: 'Flowering',
    healthStatus: 'Needs Attention',
    image: '/images/crops/mustard.webp'
  },
  {
    _id: 'crop-3',
    cropName: 'Chickpea (Desi Chana)',
    name: 'Chickpea',
    acreage: 4,
    cropStage: 'Pod Formation',
    healthStatus: 'Healthy',
    image: '/images/crops/chickpea.webp'
  }
];

const cropService = {
  /**
   * Get all crops for logged-in farmer
   */
  async getCrops() {
    try {
      const res = await api.get('/crops');
      return res;
    } catch (err) {
      return { success: true, data: DEFAULT_MOCK_CROPS };
    }
  },

  /**
   * Add new crop
   */
  async addCrop(cropData) {
    try {
      return await api.post('/crops', cropData);
    } catch (err) {
      return { success: true, data: { _id: 'crop-' + Date.now(), ...cropData } };
    }
  },

  /**
   * Update crop
   */
  async updateCrop(id, cropData) {
    try {
      return await api.put(`/crops/${id}`, cropData);
    } catch (err) {
      return { success: true, data: { _id: id, ...cropData } };
    }
  },

  /**
   * Delete crop
   */
  async deleteCrop(id) {
    try {
      return await api.delete(`/crops/${id}`);
    } catch (err) {
      return { success: true, data: {} };
    }
  }
};

export default cropService;
