'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';
import SvgIcon from '@/components/SvgIcon';
import styles from './Chat.module.scss';

const BotAvatar = ({ size }: { size?: string }) => {
  return (
    <div className={`${styles.chatBotAvatar} ${size ? styles[size] : ''}`}>
      <Image width={100} height={100} src='/assets/img/bot.png' alt='chatbot' />
    </div>
  );
};

const UserAvatar = ({ size }: { size: string }) => {
  return (
    <div className={`${styles.userAvatar}  ${size ? styles[size] : ''}`}>
      <div className={`${styles.avatarIcon}`}>
        <SvgIcon name='account' />
      </div>
    </div>
  );
};

const Chat = () => {
  const promptEl = useRef<HTMLTextAreaElement>(null);
  const historyEl = useRef<HTMLDivElement>(null);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const [isHold, setIshold] = useState(false);
  const [isShowCopyright] = useState(true);

  const defaultQuestions = useMemo(() => {
    return [
      'What is ESG? 🌱',
      'What are the 3 pillars of ESG? 🌍',
      'What is the difference between CSR and ESG?',
      'How ESG is measured?',
      'How ESG is reported?',
      'How ESG creates value?',
      'ESG and PropTech',
    ];
  }, []);

  useEffect(() => {
    if (historyEl.current) {
      historyEl.current.scrollTop = historyEl.current.scrollHeight;
    }

    setTimeout(() => {
      if (!promptEl.current) return;
      promptEl.current.focus();
    }, 1000);

    if (messageHistory.length > 0) return;
    setTimeout(() => {
      setMessageHistory([
        {
          role: 'bot',
          parts: 'Hello 👋 How can I help you?',
          options: defaultQuestions,
        },
      ]);
    }, 1200);
  }, [messageHistory, defaultQuestions]);

  const sendUserMessage = async (msg: any) => {
    setMessageHistory((prev: any) => {
      return [
        ...prev,
        {
          role: 'user',
          parts: msg,
          options: null,
        },
      ];
    });

    await getAIAnswer(msg);
  };

  const setClosePanel = () => {
    window.parent.parent.postMessage({ chatbotMsg: 'close', from: 'ddpchat' }, '*');
  };

  const getAIAnswer = useCallback(async (txt: string) => {
    setIshold(true);
    setMessageHistory((prev: any) => {
      return [
        ...prev,
        {
          role: 'bot',
          parts: 'loading',
        },
      ];
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: txt }),
      });

      const data = await res.json();

      const processedContent = await remark()
        .use(html)
        .process(data.data?.response ? data.data?.response : data.status);

      setIshold(false);

      let resMessage;
      if (data.data && data.data.response !== null) {
        resMessage = processedContent.value;
      } else {
        resMessage = data.error.message ? data.error.message : data.status;
      }

      setMessageHistory((prev: any) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].parts = resMessage;
        return newHistory;
      });

      return data;
    } catch (error) {
      console.log(error);
      setIshold(false);
      setMessageHistory((prev: any) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].parts = error;
        return newHistory;
      });
    }
  }, []);

  useEffect(() => {
    if (!historyEl.current) return;
    historyEl.current.scrollTop = historyEl.current.scrollHeight;
  }, [messageHistory]);

  return (
    <div className={`${styles.chat}`}>
      <div className={`${styles.chatInner}`}>
        <div className={`${styles.chatPanel}`}>
          <div className={`${styles.chatPanelInner}`}>
            <div className={`${styles.chatPanelHead}`}>
              <div className={`${styles.chatBotInfo}`}>
                <BotAvatar />
                <div className={`${styles.chatBotName}`}>
                  <span className={`${styles.nameTxt}`}>ESG Helper</span>
                  <span className={`${styles.nameSubTxt}`}>Online</span>
                </div>
              </div>
              <div className={`${styles.utils}`}>
                <button className={`${styles.chatPanelClose}`} onClick={() => setClosePanel()}>
                  <div className={`${styles.icon}`}>
                    <SvgIcon name='close' />
                  </div>
                </button>
              </div>
              <AnimatePresence>
                {isHold && (
                  <motion.div
                    className={`${styles.loadingEffect}`}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5, ease: 'easeInOut' }}
                  >
                    <div className={`${styles.loadingEffectInner}`}></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={`${styles.chatPanelBody}`}>
              <div className={`${styles.panelBodyInner}`}>
                <div ref={historyEl} className={`${styles.messageWindow}`}>
                  <div className={`${styles.messageHistory}`}>
                    <AnimatePresence>
                      {messageHistory?.map((item, index) => {
                        return (
                          <motion.div
                            className={`${styles.messageItem} ${styles[item.role]}`}
                            key={index}
                            exit={{ y: '10px', opacity: 0 }}
                            initial={{ y: '10px', opacity: 0 }}
                            animate={{ y: '0px', opacity: 1 }}
                            transition={{ type: 'spring', duration: 0.5, ease: 'easeInOut' }}
                          >
                            <div className={`${styles.avatarWrap}`}>
                              {item.role === 'user' && <UserAvatar size='sm' />}
                              {item.role === 'bot' && <BotAvatar size='sm' />}
                            </div>
                            <div className={`${styles.contentWrap}`}>
                              <div className={`${styles.messageCloud}`}>
                                {item.parts === 'loading' ? (
                                  <div className={`${styles.messageTxt}`}>
                                    <div className={`${styles.loadingTxt}`}>
                                      <div />
                                      <div />
                                      <div />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className={`${styles.messageTxt} richText`}
                                    dangerouslySetInnerHTML={{ __html: item.parts }}
                                  />
                                )}

                                <div className={`${styles.cloudTail}`}>
                                  <Image
                                    width={100}
                                    height={100}
                                    src={`/assets/img/tail${item.role === 'user' ? '_user' : ''}.png`}
                                    alt='user'
                                  />
                                </div>
                              </div>
                              {item.options && (
                                <div className={`${styles.options}`}>
                                  <AnimatePresence>
                                    {item.options.map((option: string, index: number) => {
                                      return (
                                        <motion.button
                                          key={index}
                                          className={`${styles.optionItem}`}
                                          onClick={() => {
                                            sendUserMessage(option);
                                          }}
                                          exit={{ y: 5, opacity: 0 }}
                                          initial={{ y: 5, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{
                                            type: 'spring',
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: 'easeInOut',
                                          }}
                                        >
                                          <div className={`${styles.optionInner}`}>
                                            {index + 1}. {option}
                                          </div>
                                        </motion.button>
                                      );
                                    })}
                                  </AnimatePresence>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
                <AnimatePresence>
                  <motion.div
                    className={`${styles.promptWindow}`}
                    exit={{ bottom: '50px', opacity: 0 }}
                    initial={{ bottom: '50px', opacity: 0 }}
                    animate={{ bottom: isShowCopyright ? '20px' : '0px', opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
                  >
                    <div className={`${styles.prompt}`}>
                      <textarea
                        ref={promptEl}
                        rows={1}
                        placeholder='Type your message here...'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (String(promptEl.current?.value.trim()).length < 1) return;
                            sendUserMessage(promptEl.current?.value);
                            promptEl.current!.value = '';
                          }
                        }}
                        disabled={isHold ? true : false}
                      />
                      <button
                        className={`${styles.sendPrompt}`}
                        onClick={(e) => {
                          if (!promptEl.current?.value || promptEl.current?.value === '') {
                            promptEl.current?.focus();
                            return;
                          }
                          if (String(promptEl.current?.value.trim()).length < 1) return;
                          sendUserMessage(promptEl.current?.value);
                          promptEl.current!.value = '';
                          promptEl.current?.focus();
                          e.preventDefault();
                        }}
                      >
                        <div className={`${styles.sendCtaInner}`}>
                          <div className={`${styles.promptIcon}`}>
                            <SvgIcon name='send' />
                          </div>
                          <div className={`${styles.gradient}`} />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
                {isShowCopyright && (
                  <div className={`${styles.copyright}`}>
                    <div className={`${styles.label}`}>Powerd by</div>
                    <Link href='https://digidumpling.com/?utm_source=ddp-chatbot' target='_blank'>
                      <Image src={`/assets/img/logo.png`} width={70} height={10} alt='DigiDumpling' />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
