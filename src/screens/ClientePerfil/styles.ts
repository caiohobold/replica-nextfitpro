import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  status: {
    color: 'red',
    fontWeight: 'bold',
  },
  sexo: {
    fontSize: 16,
    color: '#666',
  },
  saldoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    padding: 15
  },
  saldoItem: {
    alignItems: 'center',
  },
  saldoValor: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  saldoValorEmAtraso: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
  saldoValorCredito: {
    color: 'green',
    fontSize: 17,
    fontWeight: 'bold',
  },
  saldoLabel: {
    fontSize: 14,
    color: '#666',
  },
  contratosContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contratoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  contratoDescricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contratoValidade: {
    fontSize: 14,
    color: '#666',
  },
  sobreContainer: {
    marginBottom: 20,
  },
  alertaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertaTexto: {
    fontSize: 14,
    color: '#666',
  },
  scene: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  halfInputGroup: {
    flex: 1,
    marginRight: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

  export default styles;