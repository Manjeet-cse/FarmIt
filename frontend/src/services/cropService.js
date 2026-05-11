import api from './api';

const cropService = {
  /**
   * Get all crops for logged-in farmer
   */
  async getCrops() {
    return await api.get('/crops');
  },

  /**
   * Add new crop
   */
  async addCrop(cropData) {
    return await api.post('/crops', cropData);
  },

  /**
   * Update crop
   */
  async updateCrop(id, cropData) {
    return await api.put(`/crops/${id}`, cropData);
  },

  /**
   * Delete crop
   */
  async deleteCrop(id) {
    return await api.delete(`/crops/${id}`);
  }
};

export default cropService;
