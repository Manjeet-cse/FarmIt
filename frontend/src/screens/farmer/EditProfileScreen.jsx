import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useAuth } from '../../store/AuthContext';
import { createDebouncedSearch } from '../../services/locationService';
import cropService from '../../services/cropService';

export default function EditProfileScreen() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { updateProfile } = useAuth(); // Keep for structure if needed, but not required
  
  // Profile & Farm Detail States
  const [editName, setEditName] = useState('Manjeet Lodha');
  const [editLocation, setEditLocation] = useState('Guna, Madhya Pradesh');
  const [editLandArea, setEditLandArea] = useState('12');
  const [editIrrigation, setEditIrrigation] = useState('Drip & Sprinkler');
  const [editSoil, setEditSoil] = useState('Black Cotton Soil');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const locationTimerRef = useRef(null);
  const debouncedLocationSearch = useRef(createDebouncedSearch(locationTimerRef, 400)).current;

  // Crop Management States
  const [crops, setCrops] = useState([
    {
      _id: '1',
      cropName: 'Wheat (Sujata)',
      acreage: 5,
      cropStage: 'Vegetative Stage',
      healthStatus: 'Healthy',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?fit=crop&w=200&h=200'
    },
    {
      _id: '2',
      cropName: 'Mustard (Pusa)',
      acreage: 3,
      cropStage: 'Flowering',
      healthStatus: 'Needs Attention',
      image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?fit=crop&w=200&h=200'
    }
  ]);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const [cropForm, setCropForm] = useState({ cropName: '', acreage: '', cropStage: 'Sowing' });
  const [isSavingCrop, setIsSavingCrop] = useState(false);
  const [showCropSheet, setShowCropSheet] = useState(false);

  const handleLocationChange = (value) => {
    setEditLocation(value);
    if (value.trim().length < 2) {
      setLocationSuggestions([]);
      setIsSearchingLocation(false);
      return;
    }
    setIsSearchingLocation(true);
    debouncedLocationSearch(value, (results) => {
      setLocationSuggestions(results);
      setIsSearchingLocation(false);
    });
  };

  const selectLocation = (item) => {
    const locationStr = item.state ? `${item.name}, ${item.state}` : item.name;
    setEditLocation(locationStr);
    setLocationSuggestions([]);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      navigate(-1);
    }, 1000);
  };

  const handleAddCrop = async () => {
    if (!cropForm.cropName) return;
    setIsSavingCrop(true);
    // Simulate add
    setTimeout(() => {
      const newCrop = {
        _id: Date.now().toString(),
        cropName: cropForm.cropName,
        acreage: cropForm.acreage || 0,
        cropStage: cropForm.cropStage,
        healthStatus: 'Healthy',
        image: ''
      };
      setCrops([newCrop, ...crops]);
      setShowCropSheet(false);
      setCropForm({ cropName: '', acreage: '', cropStage: 'Sowing' });
      setIsSavingCrop(false);
    }, 500);
  };

  const handleDeleteCrop = async (cropId) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      setCrops(crops.filter(c => c._id !== cropId));
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light relative">
      {isMobile && (
        <AppTopBar 
          title="Edit Profile" 
          showProfile={false} 
          showBack={true} 
          onBack={() => navigate(-1)} 
        />
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-6 max-w-3xl md:mx-auto w-full pb-24">
        {!isMobile && (
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors bg-transparent border-none cursor-pointer flex items-center justify-center text-onSurface-variant"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline font-bold text-2xl text-onSurface m-0">Edit Profile</h1>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <h2 className="font-headline font-semibold text-lg text-onSurface m-0 border-b border-outline-variant/20 pb-2">Personal Details</h2>
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-sm text-onSurface-variant font-medium">Full Name</label>
            <input 
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="font-label text-sm text-onSurface-variant font-medium">Location (City, State)</label>
            <input 
              type="text"
              value={editLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface"
              placeholder="e.g. Guna, Madhya Pradesh"
            />
            
            {/* Search Suggestions Dropdown */}
            {isSearchingLocation && (
              <div className="absolute top-[70px] left-0 right-0 bg-surface-containerHigh border border-outline-variant/30 rounded-xl shadow-lg z-50 overflow-hidden px-4 py-3">
                <span className="font-body text-sm text-onSurface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  Searching...
                </span>
              </div>
            )}
            {!isSearchingLocation && locationSuggestions.length > 0 && (
              <div className="absolute top-[70px] left-0 right-0 bg-surface-containerHigh border border-outline-variant/30 rounded-xl shadow-lg z-50 overflow-hidden">
                {locationSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectLocation(item)}
                    className="w-full text-left px-4 py-3 hover:bg-surface-containerHighest transition-colors border-b border-outline-variant/20 last:border-b-0 flex items-center gap-3 cursor-pointer bg-transparent"
                  >
                    <span className="material-symbols-outlined text-onSurface-variant text-sm">location_on</span>
                    <div className="flex flex-col">
                      <span className="font-body text-base text-onSurface">{item.name}</span>
                      {item.state && <span className="font-body text-xs text-onSurface-variant">{item.state}</span>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <h2 className="font-headline font-semibold text-lg text-onSurface m-0 mt-4 border-b border-outline-variant/20 pb-2">Farm Details</h2>
          
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-sm text-onSurface-variant font-medium">Total Land Area (Acres)</label>
            <input 
              type="number"
              value={editLandArea}
              onChange={(e) => setEditLandArea(e.target.value)}
              className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface"
              placeholder="e.g. 5.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label text-sm text-onSurface-variant font-medium">Irrigation Type</label>
            <select 
              value={editIrrigation}
              onChange={(e) => setEditIrrigation(e.target.value)}
              className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface appearance-none"
            >
              <option value="None">None (Rainfed)</option>
              <option value="Tube Well">Tube Well</option>
              <option value="Canal">Canal</option>
              <option value="Drip">Drip Irrigation</option>
              <option value="Sprinkler">Sprinkler</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label text-sm text-onSurface-variant font-medium">Soil Type</label>
            <select 
              value={editSoil}
              onChange={(e) => setEditSoil(e.target.value)}
              className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface appearance-none"
            >
              <option value="Alluvial">Alluvial Soil</option>
              <option value="Black">Black Soil (Cotton Soil)</option>
              <option value="Red">Red Soil</option>
              <option value="Laterite">Laterite Soil</option>
              <option value="Loamy">Loamy Soil</option>
            </select>
          </div>

          <div className="flex justify-between items-end mt-4 border-b border-outline-variant/20 pb-2">
            <h2 className="font-headline font-semibold text-lg text-onSurface m-0">My Crops</h2>
            <button 
              onClick={() => setShowCropSheet(true)}
              className="flex items-center gap-1 text-primary hover:text-primary-container font-label font-semibold text-sm transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
              Add Crop
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {loadingCrops ? (
              <div className="py-6 flex justify-center">
                <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
              </div>
            ) : crops.length === 0 ? (
              <div className="text-center py-6 bg-surface-container rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-4xl text-onSurface-variant/50 mb-2">grass</span>
                <p className="font-body text-sm text-onSurface-variant m-0">No crops added yet.</p>
              </div>
            ) : (
              crops.map(crop => (
                <div key={crop._id} className="flex items-center justify-between bg-surface-container p-4 rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">grass</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-base text-onSurface m-0">{crop.cropName}</h4>
                      <p className="font-body text-sm text-onSurface-variant m-0">{crop.acreage} Acres • {crop.cropStage}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteCrop(crop._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-error/10 text-error hover:bg-error/20 transition-colors border-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

        </div>

        <div className="mt-8">
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="w-full h-12 bg-primary text-onPrimary font-headline font-bold text-base rounded-xl border-none cursor-pointer hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Add Crop Bottom Sheet */}
      {showCropSheet && (
        <>
          <div
            className="absolute inset-0 bg-black/40 z-[60] transition-opacity"
            onClick={() => setShowCropSheet(false)}
          />
          <div className="absolute bottom-0 left-0 w-full bg-surface-containerLowest rounded-t-3xl z-[60] flex flex-col pb-6 max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="w-12 h-1.5 bg-outline-variant/50 rounded-full mx-auto my-3 shrink-0"></div>
            <div className="flex items-center justify-between px-6 pb-4 border-b border-outline-variant/20">
              <h2 className="font-headline font-bold text-xl text-onSurface m-0">Add New Crop</h2>
              <button
                className="bg-transparent border-none p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center text-onSurface-variant"
                onClick={() => setShowCropSheet(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label text-sm text-onSurface-variant font-medium">Crop Name</label>
                <input 
                  type="text"
                  value={cropForm.cropName}
                  onChange={(e) => setCropForm({ ...cropForm, cropName: e.target.value })}
                  className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface"
                  placeholder="e.g. Wheat, Mustard"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label text-sm text-onSurface-variant font-medium">Acreage (Acres)</label>
                <input 
                  type="number"
                  value={cropForm.acreage}
                  onChange={(e) => setCropForm({ ...cropForm, acreage: e.target.value })}
                  className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface"
                  placeholder="e.g. 2.5"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-label text-sm text-onSurface-variant font-medium">Current Stage</label>
                <select 
                  value={cropForm.cropStage}
                  onChange={(e) => setCropForm({ ...cropForm, cropStage: e.target.value })}
                  className="w-full h-12 bg-surface-container px-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none font-body text-base text-onSurface appearance-none"
                >
                  <option value="Sowing">Sowing</option>
                  <option value="Growing">Growing</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Grain Filling">Grain Filling</option>
                  <option value="Harvesting">Harvesting</option>
                </select>
              </div>
            </div>

            <div className="px-6 mt-2">
              <button
                onClick={handleAddCrop}
                disabled={isSavingCrop || !cropForm.cropName}
                className="w-full h-12 bg-primary text-onPrimary font-headline font-bold text-base rounded-xl border-none cursor-pointer hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSavingCrop ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Add Crop'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
