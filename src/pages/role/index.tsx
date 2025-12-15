import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import Select from '../../components/Select';
import { CLUB, CLUB_LEO_KING, CLUB_OLE_FLOW, token } from '../../consts';
import useGames from '../../hooks/useGames';
import { Item } from '../../interface';
import { IInfoGame, Role } from '../../interface';
import { getDate, getIcon, transformText } from '../../utils';
import './style.scss';

const RoleComponent = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const { games, updateGame, loading } = useGames();
  const [game, setGame] = useState<Item[]>([]);
  const [infoGame, setInfoGame] = useState<IInfoGame>();
  const [formValues, setFormValues] = useState<Record<number, Item>>({});
  const [resultMatch, setResultMatch] = useState<string>('none');
  const [comment, setComment] = useState<string>('');
  const [checked, setChecked] = useState<Record<string, boolean>>({
    isShowRole: false,
    isShowPoint: false,
  });
  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const current_game = games.filter((game) => game.id === id);
    const playersWithRole = current_game[0]?.playersWithRole.sort(
      (a: Item, b: Item) => a.id - b.id
    );
    const result: any = {};
    if (playersWithRole?.length > 0) {
      for (let i = 1; i < playersWithRole.length + 1; i++) {
        const element = playersWithRole.find((el: Item) => el.id === i);
        if (element) {
          result[`${i}`] = { ...element, point: 0 };
        }
      }
    }

    setFormValues(result);
    setGame(playersWithRole);
    setInfoGame(current_game[0]);
  }, [games, id]);

  const getResultMatch = (): string => {
    if (checked.isShowRole) {
      return resultMatch === 'none'
        ? ''
        : resultMatch === 'red'
          ? 'Победа мирных'
          : 'Победа черных';
    }
    return '';
  };

  const getChatId = () => {
    const club = localStorage.getItem(CLUB);
    if (club === CLUB_LEO_KING) return '-1001768320094';
    if (club === CLUB_OLE_FLOW) return '-1002143047041';
  };

  const message = async () => {
    try {
      const obj = {
        // chat_id: '518174528', // home
        chat_id: getChatId(),
        text: `
📆 ${getDate()}
▶️ Игра №: ${infoGame?.numberGame}
👨🏻‍⚖️ Ведущий: ${infoGame?.role} ${infoGame?.judge}

${Object.values(formValues)
  .map(
    (item) =>
      `${item.id}. ${transformText(item.userName)} ${checked.isShowRole ? getIcon(item.role) : ''}\n`
  )
  .join('')}

${getResultMatch()}
${comment}`,
      };
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      navigate('/games');
    } catch (err) {}
  };

  const handleChange = (id: number, role: Role) => {
    const current = game.filter((games) => games.id === id);
    const res: Item = { ...current[0], role: role };

    if (infoGame && infoGame.id_doc) {
      updateGame(infoGame.id_doc, res);
    }
  };

  const onInputChanges = (id: number, name: string) => {
    const current = game.filter((games) => games.id === id);
    const res: Item = { ...current[0], userName: name };
    if (infoGame && infoGame.id_doc) {
      updateGame(infoGame.id_doc, res);
    }

    // if (typeof id === 'number') {
    //   setFormValues((prevFormValues) => ({
    //     ...prevFormValues,
    //     [id as any]: {
    //       ...prevFormValues[id as any],
    //       point: Number(point) || 0,
    //     },
    //   }));
    // }
  };

  return (
    <form>
      <Typography variant="caption"> table:{id}</Typography>
      <FormGroup style={{ flexDirection: 'row' }}>
        <FormControlLabel
          control={
            <Checkbox
              name="isShowRole"
              checked={checked['isShowRole']}
              onChange={handleChangeRole}
            />
          }
          label="Роли"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isShowPoint"
              checked={checked['isShowPoint']}
              onChange={handleChangeRole}
            />
          }
          label="Очки"
        />
      </FormGroup>
      <hr />
      {loading ? (
        <CircularProgress />
      ) : (
        game?.map((item: Item) => {
          return (
            <GameItem
              key={item.id}
              isShowRole={checked.isShowRole}
              isShowPoint={checked.isShowPoint}
              item={item}
              cbSelect={handleChange}
              changeValue={(name) => onInputChanges(item.id, name)}
            />
          );
        })
      )}
      <hr />

      {!checked.isShowRole ? null : (
        <div className="result-game">
          <span>Победа &nbsp;</span>
          <select value={resultMatch} onChange={(e) => setResultMatch(e.target.value)}>
            <option value="none">none</option>
            <option value="red">Red</option>
            <option value="mafia">Mafia</option>
          </select>
        </div>
      )}

      <textarea
        placeholder="Комментарий к игре"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <hr />
      <Button variant="contained" onClick={message}>
        отправить в телегу
      </Button>
      {/* <Button variant="contained" onClick={handleClick}>сохранить</Button> */}
      {/* <h2>{JSON.stringify(formValues)}</h2> */}
    </form>
  );
};

export default RoleComponent;

export const GameItem = ({
  isShowRole,
  isShowPoint,
  item,
  cbSelect,
  changeValue,
}: {
  item: Item;
  isShowRole: boolean;
  isShowPoint: boolean;
  cbSelect: (id: number, role: Role) => void;
  changeValue: (value: string) => void;
}) => {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [value, setValue] = useState<string>();

  const handle = (e: any) => {
    e.preventDefault();

    if (isDisabled) {
      setDisabled(false);
    } else {
      setDisabled(true);
      changeValue(value || '');
    }
  };

  useEffect(() => {
    setValue(item.userName);
  }, [item.userName]);

  return (
    <div style={{ display: 'flex', marginBottom: 5 }}>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '20px' }}>{item.id}</span>
        <input
          style={{ margin: '0 5px' }}
          onChange={(e) => setValue(e.target.value)}
          disabled={isDisabled}
          value={value}
        ></input>
        <button onClick={(e) => handle(e)}>{isDisabled ? 'Edit' : 'Save'}</button>
      </label>

      {isShowRole && <Select role={item.role} cb={(role) => cbSelect(item.id, role)} />}

      {/* {isShowPoint && <input type="number" step={0.1} style={{ width: '50px' }} value={item.point} onChange={(e) => onInputChanges(item.id, e.target.value)} />} */}
    </div>
  );
};
