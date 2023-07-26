import { hash } from 'bcryptjs';
import { CREATED } from '@/constants/httpStatusCodes';
import makeRequest from '@/utils/makeRequest';

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 12);

    const newUser = { name, email, password: hashedPassword };

    const response = await makeRequest({ method: 'POST', path: '/register', data: newUser });

    const user = {
      id: response.id,
      name: response.name,
      email: response.email,
    };

    return res.status(CREATED).json({ success: true, user });
  } catch (error) {
    const { status, error: errorMessage } = error;
    return res.status(status).json({ error: errorMessage });
  }
};

export default createUser;
