import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SignatureState } from '../types';
import { SavedSignatureRecord } from '../services/signatureService';

interface CloudSignaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: SignatureState;
  onLoadSignature: (record: SavedSignatureRecord) => void;
  showToast: (msg: string) => void;
}

export const CloudSignaturesModal: React.FC<CloudSignaturesModalProps> = ({
  isOpen,
  onClose,
  currentState,
  onLoadSignature,
  showToast,
}) => {
  const { user, signIn, savedSignatures, saveCurrentSignature, deleteSignature } = useAuth();
  const [signatureTitle, setSignatureTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in with Google first');
      return;
    }
    const titleToUse = signatureTitle.trim() || `${currentState.personal.firstName}'s Signature`;
    setIsSaving(true);
    try {
      await saveCurrentSignature(titleToUse, currentState);
      setSignatureTitle('');
      showToast(`✓ Signature "${titleToUse}" saved to Firebase!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to save signature to cloud');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete signature "${title}" from Firebase?`)) {
      try {
        await deleteSignature(id);
        showToast(`Signature "${title}" deleted`);
      } catch (err) {
        showToast('Error deleting signature');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-[#cbd5e1] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#07162c] via-[#002956] to-[#0f3460] text-white flex items-center justify-between border-b border-[#1b3152]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d29900] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[16px] text-white">Firebase Cloud Signatures</h3>
              <p className="text-[11px] text-[#93c5fd]">
                Sync your personalized email signatures securely across workstations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94a3b8] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
          {!user ? (
            /* Logged Out State */
            <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-6 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#002956] text-[#d29900] flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[26px]">account_circle</span>
              </div>
              <h4 className="font-extrabold text-[16px] text-[#002956]">Sign in to access Cloud Sync</h4>
              <p className="text-[13px] text-[#475569] max-w-md">
                Connect your Google account to store signatures in Firebase Firestore, load them on any workstation, and never lose your brand customizations.
              </p>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signIn();
                    showToast('✓ Signed in successfully with Google!');
                  } catch {
                    showToast('Sign in cancelled or failed');
                  }
                }}
                className="mt-2 px-6 py-3 bg-[#002956] hover:bg-[#071933] text-white font-extrabold text-[13px] rounded-xl transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#d29900] text-[18px]">login</span>
                Sign in with Google
              </button>
            </div>
          ) : (
            /* Logged In State */
            <>
              {/* Save Current Signature Form */}
              <form onSubmit={handleSave} className="bg-[#f8fafc] p-4 rounded-2xl border border-[#cbd5e1] flex flex-col gap-2.5">
                <label className="text-[12px] font-bold text-[#002956] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#d29900] text-[16px]">bookmark_add</span>
                  Save Active Signature to Firebase
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={signatureTitle}
                    onChange={e => setSignatureTitle(e.target.value)}
                    placeholder="Signature title (e.g. Executive Corporate 2026)"
                    className="flex-grow h-10 px-3.5 rounded-xl bg-white border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:border-[#d29900] shadow-xs"
                  />
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="h-10 px-5 bg-[#002956] hover:bg-[#071933] text-white text-[12px] font-extrabold rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[#d29900] text-[16px]">cloud_upload</span>
                    {isSaving ? 'Saving...' : 'Save to Cloud'}
                  </button>
                </div>
              </form>

              {/* Saved Signatures List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-[14px] text-[#002956] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#d29900] text-[18px]">folder_special</span>
                    Your Saved Signatures ({savedSignatures.length})
                  </h4>
                  <span className="text-[11px] text-[#64748b]">Connected: {user.email}</span>
                </div>

                {savedSignatures.length === 0 ? (
                  <div className="p-8 text-center text-[#64748b] bg-[#f8fafc] rounded-2xl border border-dashed border-[#cbd5e1]">
                    <span className="material-symbols-outlined text-[32px] text-[#94a3b8] mb-1">inventory_2</span>
                    <p className="text-[13px] font-medium">No saved signatures in Firestore yet.</p>
                    <p className="text-[11px] text-[#94a3b8] mt-0.5">Use the box above to save your current configuration.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                    {savedSignatures.map(sig => (
                      <div
                        key={sig.id}
                        className="bg-white p-3.5 rounded-xl border border-[#cbd5e1] hover:border-[#d29900]/60 transition-all flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex flex-col gap-0.5 flex-grow truncate">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[13px] text-[#002956] truncate">
                              {sig.title}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-orange-100 text-orange-700 px-2 py-0.2 rounded">
                              {sig.template}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#64748b] truncate">
                            {sig.personal?.firstName} {sig.personal?.lastName} • {sig.company?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onLoadSignature(sig);
                              showToast(`✓ Loaded "${sig.title}" into editor`);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-[#002956] hover:bg-[#d29900] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">download</span>
                            Load
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(sig.id, sig.title)}
                            title="Delete from Firestore"
                            className="p-1.5 text-[#94a3b8] hover:text-[#ba1a1a] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f8fafc] border-t border-[#cbd5e1] flex items-center justify-between">
          <span className="text-[11px] text-[#64748b] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#10b981]">verified</span>
            Secured by Firestore Zero-Trust Rules
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-slate-50 text-[#0f172a] font-semibold text-[12px] rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
