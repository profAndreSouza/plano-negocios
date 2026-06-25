import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = usePlan();
  const { signIn, signUp } = useAuth();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    // Reset state
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }

    if (!isLoginTab && password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      if (isLoginTab) {
        // Sign In
        const { error } = await signIn(email.trim(), password);
        if (error) {
          if (error.status === 400) {
            setErrorMsg('E-mail ou senha inválidos.');
          } else {
            setErrorMsg(error.message || 'Erro ao efetuar login.');
          }
        } else {
          handleClose();
        }
      } else {
        // Sign Up
        const { data, error } = await signUp(email.trim(), password);
        if (error) {
          setErrorMsg(error.message || 'Erro ao cadastrar conta.');
        } else if (data?.user && data?.session === null) {
          // If email confirmation is enabled on Supabase
          setSuccessMsg('Conta criada com sucesso! Por favor, verifique sua caixa de entrada para confirmar o e-mail.');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setSuccessMsg('Conta cadastrada e conectada com sucesso!');
          setTimeout(() => {
            handleClose();
          }, 1500);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {isLoginTab ? 'Acessar Conta' : 'Criar Nova Conta'}
          </h3>
          <button className="btn-close-modal" onClick={handleClose} disabled={loading}>
            &times;
          </button>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(true);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={loading}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(false);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={loading}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body auth-modal-body">
            {errorMsg && (
              <div className="auth-message error">
                <span>⚠️</span> {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="auth-message success">
                <span>✅</span> {successMsg}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Endereço de E-mail</label>
              <input
                type="email"
                className="form-input"
                placeholder="seuemail@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || successMsg}
                autoFocus
              />
            </div>

            <div className="form-group" style={{ marginTop: '12px' }}>
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-input"
                placeholder="Mínimo 6 caracteres"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || successMsg}
              />
            </div>

            {!isLoginTab && (
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label className="form-label">Confirmar Senha</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Repita sua senha"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || successMsg}
                />
              </div>
            )}
          </div>

          <div className="modal-footer" style={{ marginTop: '8px' }}>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-confirm btn-auth-submit"
              disabled={loading || successMsg}
            >
              {loading ? (
                <span className="auth-spinner">Carregando...</span>
              ) : isLoginTab ? (
                'Entrar'
              ) : (
                'Cadastrar Conta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
